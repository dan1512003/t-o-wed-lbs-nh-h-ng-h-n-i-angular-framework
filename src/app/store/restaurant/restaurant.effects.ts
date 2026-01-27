import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { findByClick, findByClickFailure, findByClickSuccess, findByMove, findByMoveFailure, findByMoveSuccess, findBySearch, findBySearchFailure, findBySearchSuccess, loadRestaurantById, loadRestaurantByIdFailure, loadRestaurantByIdSuccess } from "./restaurant.actions";
import { mergeMap, map, catchError, switchMap, exhaustMap, debounceTime } from 'rxjs/operators';
import { of, forkJoin, Observable } from 'rxjs'; 
import { NominatimPlace } from "../../model/nominatimplace/nominatimplace.model";
import { Restaurant } from "../../services/restaurant/restaurant";
import { Review } from "../../services/review/review";
import { RestaurantModel } from "../../model/restaurant/restaurant.model";
import { ReviewModel } from "../../model/review/review.model";
import { Ward } from "../../services/ward/ward";
import { Place } from "../../services/place/place";
import { WardModel } from "../../model/ward/ward.model";
@Injectable()
export class RestaurantEffects {

findByClick$ = createEffect(() =>
  this.actions$.pipe(
    ofType(findByClick),
    switchMap(({ lat, lon }) =>
      this.wardService.getWardByLatLon(lat, lon).pipe(
        switchMap((dataWard) => {
         const featuresward:any[] = dataWard['features'];

          const listward = featuresward.map(f =>
              WardModel.fromMap(f['properties'])
            );

       
          const ward = listward[0];
          const wardId = Number(ward.osmId);

          return this.restaurantService.getRestaurantByIdWard(wardId).pipe(
            map((dataRestaurant) => {
            const featuresRestaurant: any[] = dataRestaurant['features'];
              return featuresRestaurant.map((f: any) =>
                RestaurantModel.fromFeature(f)
              );
            }),

            // add review
            switchMap((restaurants) =>
              addReviewToRestaurant(restaurants, this.reviewService)
            ),

            map((restaurantMap) =>
              findByClickSuccess({
                resultsRestaurant: Array.from(restaurantMap.values()),
              })
            )
          );
        }),

        catchError(() =>
          of(
            findByClickFailure({
              error: 'API error',
            })
          )
        )
      )
    )
  )
);

findByMove$ = createEffect(() =>
  this.actions$.pipe(
    ofType(findByMove),

   
    debounceTime(300),

  
    switchMap(({ minLon, minLat, maxLon, maxLat}) =>
      this.restaurantService
        .getRestaurantBound(minLon, minLat, maxLon, maxLat)
        .pipe(
          map((data) => {
            const featuresRestaurant: any[] = data['features'];
             return featuresRestaurant.map(f => RestaurantModel.fromFeature(f));
          }),
          switchMap((restaurants) =>
             addReviewToRestaurant(restaurants, this.reviewService)
          ),
           map(restaurantMap =>
                findByMoveSuccess({
                  resultsRestaurant: Array.from(restaurantMap.values()),
                })
              ),
          catchError(() =>
            of(
              findByMoveFailure({
                error: 'API error',
              })
            )
          )
        )
    )
  )
);

  findBySearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findBySearch),

      mergeMap(({ query }) => {
        if (!query.trim()) {
          return of(findBySearchSuccess({ resultsRestaurant: [] }));
        }

        return forkJoin({
          datanominatimplace: this.placeService.searchPlace(query),
          datarestaurant: this.restaurantService.getRestaurant(),
          dataward: this.wardService.getWard(),
        }).pipe(
          mergeMap(({ datanominatimplace, datarestaurant, dataward }) => {
            const featuresnominatimplace:any[] = datanominatimplace?.features ?? [];
            const featuresrestaurant :any[]= datarestaurant?.features ?? [];
            const featuresward:any[] = dataward?.features ?? [];

            const listrestaurant = featuresrestaurant.map(f =>
              RestaurantModel.fromFeature(f)
            );

            const listward = featuresward.map(f =>
              WardModel.fromMap(f['properties'])
            );

            const listnominatimplace = featuresnominatimplace
              .filter(f => {
                const p = f['properties'];
                return (
                  p &&
                  ((p.category === 'amenity' && p.type === 'restaurant') ||
                    (p.category === 'boundary' &&
                      p.type === 'administrative'))
                );
              })
              .map(f => NominatimPlace.fromJson(f));

            const restaurantMap = new Map(
              listrestaurant.map(r => [r.osmId, r])
            );
            const wardMap = new Map(listward.map(w => [w.osmId, w]));

            const results = listnominatimplace.filter(
              np => restaurantMap.has(np.osmId) || wardMap.has(np.osmId)
            );

            const boundaryPlaces = results.filter(r => r.category === 'boundary');
            const amenityPlaces = results.filter(r => r.category === 'amenity');

            const place =
              boundaryPlaces.length >= amenityPlaces.length
                ? boundaryPlaces[0]
                : amenityPlaces[0];

          
            if (place.category === 'boundary') {
              return this.restaurantService
                .getRestaurantByIdWard(+place.osmId)
                .pipe(
                  map(data =>{
                    const featuresRestaurant: any[] = data['features'];
              
                   return featuresRestaurant.map(f => RestaurantModel.fromFeature(f));
                  }
                   
                  ),
                  switchMap(restaurants =>
                    addReviewToRestaurant(restaurants, this.reviewService)
                  ),
                  map(restaurantMap =>
                    findBySearchSuccess({
                      resultsRestaurant: Array.from(restaurantMap.values()),
                    })
                  ),
                  catchError(e =>
                    of(findBySearchFailure({ error: e.message }))
                  )
                );
            }

    
            const requests = amenityPlaces.map(a =>
              this.restaurantService.getRestaurantById(+a.osmId)
            );

            return forkJoin(requests).pipe(
              map(restaurants =>
              {
                  let resultsRestaurant: RestaurantModel[] =[]
                  for (const restaurant of restaurants){

               const featuresRestaurant: any[] = restaurant['features'];
               resultsRestaurant.push(
              ...featuresRestaurant.map(f => RestaurantModel.fromFeature(f))
                );

          }
          return resultsRestaurant;
              }
              ),
              switchMap(restaurants =>
                addReviewToRestaurant(restaurants, this.reviewService)
              ),
              map(restaurantMap =>
                findBySearchSuccess({
                  resultsRestaurant: Array.from(restaurantMap.values()),
                })
              ),
              catchError(e =>
                of(findBySearchFailure({ error: e.message }))
              )
            );
          }),
          catchError(e =>
            of(findBySearchFailure({ error: e.message }))
          )
        );
      })
    )
  );

loadRestaurantById$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadRestaurantById),
    switchMap(({ id }) =>
      this.restaurantService.getRestaurantById(id).pipe(

        map(res => {
          console.log('[API response]', res);

          const feature = res?.features?.[0];
          console.log('[Feature]', feature);

          if (!feature) {
            console.error('[Error] Restaurant not found');
            throw new Error('Restaurant not found');
          }

          const restaurant = RestaurantModel.fromFeature(feature);
          console.log('[RestaurantModel]', restaurant);

          return restaurant;
        }),

        switchMap(restaurant =>
          addReviewToRestaurant([restaurant], this.reviewService)
        ),

        map(restaurantMap => {
          const restaurant = Array.from(restaurantMap.values())[0];
          console.log('[Final restaurant after review]', restaurant);

          return loadRestaurantByIdSuccess({
            restaurant,
          });
        }),

        catchError(err => {
          console.error('[Effect error]', err);
          return of(loadRestaurantByIdFailure({ error: err.message }));
        })
      )
    )
  )
);


  constructor(
    private actions$: Actions,
    private placeService: Place,
    private restaurantService: Restaurant,
    private wardService: Ward,
    private reviewService: Review
  ) {}
}


export function addReviewToRestaurant(
  restaurants: RestaurantModel[],
  reviewService: Review
): Observable<Map<string, RestaurantModel>> {

  return reviewService.getReview().pipe(
    map((dataReview: any[]) => {

      const reviews: ReviewModel[] =
        dataReview.map(d => ReviewModel.fromJson(d));

     
      const restaurantMap = new Map<string, RestaurantModel>();
      restaurants.forEach(r => {
        restaurantMap.set(r.osmId, r);
      });

      // cộng điểm review vào restaurant
      reviews.forEach(r => {
        const res = restaurantMap.get(r.idRestaurant);
        if (res) {
          res.overallRating += r.overallrating ?? 0;
          res.ratefood += r.ratefood ?? 0;
          res.rateambience += r.rateambience ?? 0;
          res.rateservice += r.rateservice ?? 0;
          res.reviewCount += 1;
        }
      });

      return restaurantMap;
    })
  );
}