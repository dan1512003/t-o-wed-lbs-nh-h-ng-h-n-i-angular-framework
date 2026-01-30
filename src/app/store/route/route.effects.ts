import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, forkJoin } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap,
} from 'rxjs/operators';

import {
  clearSearch,
  findBySearchRoute,
  findBySearchRouteSuccess,
  findBySearchRouteFailure,
  getRouteSuccess,
  getRoute,
  getRouteFailure,
  findByPick,
  findByPickSuccess,
  findByPickFailure,
  searchRoute,
  searchSuccessRoute,
  searchFailureRoute,
  loadRestaurantById,
  loadRestaurantByIdSuccess,
  loadRestaurantByIdFailure,
} from './route.action';

import { Place } from '../../services/place/place';
import { Route, RouteResult } from '../../services/route/route';
import { Restaurant } from '../../services/restaurant/restaurant';

import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { addReviewToRestaurant } from '../restaurant/restaurant.effects';
import { Review } from '../../services/review/review';




@Injectable()
export class SearchMapEffects {
  constructor(
    private actions$: Actions,
    private placeService: Place,
    private routeService: Route,
    private restaurantService: Restaurant,
    private reviewService: Review,

  ) {}

 

 search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchRoute),

    

      mergeMap(({ query }) => {
       

          if (!query?.trim()) {
          return of(clearSearch());
        }
  

        return forkJoin({
          datanominatimplace: this.placeService.searchPlace(query),
          datarestaurant: this.restaurantService.getRestaurant(),
         
        }).pipe(

      
          map(({ datanominatimplace, datarestaurant}) => {
            console.log('RAW NOMINATIM:', datanominatimplace);
            console.log('RESTAURANT:', datarestaurant);
          

            const featuresnominatimplace: any[] = datanominatimplace?.features ?? [];
            const featuresrestaurant: any[] = datarestaurant?.features ?? [];
            

            console.log('FEATURES COUNT:', {
              nominatim: featuresnominatimplace.length,
              restaurant: featuresrestaurant.length,
           
            });

            const listrestaurant: RestaurantModel[] =
              featuresrestaurant.map(f => RestaurantModel.fromFeature(f));

      

            const listnominatimplace: NominatimPlace[] =
              featuresnominatimplace
                .filter(f => {
                  const p = f['properties'];
                  return !!p && (
                    (p['category'] === 'amenity' && p['type'] === 'restaurant') 
                  );
                })
                .map(f => NominatimPlace.fromJson(f));

            console.log('AFTER MAP:', {
              restaurants: listrestaurant.length,
              nominatim: listnominatimplace.length
            });

            const restaurantMap = new Map(
              listrestaurant.map(r => [r.osmId, r])
            );

       

            const results = listnominatimplace.filter(np =>
              restaurantMap.has(np.osmId) 
            );

            console.log('FINAL RESULTS:', results);

            return searchSuccessRoute({ results });
          }),

         
          catchError((error:Error) => {
            console.error('ERROR:', error.message);
            return of(searchFailureRoute({ error:error.message }));
          })
        );
      })
    )
  );


  findBySearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findBySearchRoute),

      mergeMap(({ query }) => {

       if (!query?.trim()) {
        return of(
          findBySearchRouteSuccess({ resultsRestaurant: null })
        );
      }

        return forkJoin({
          datanominatimplace: this.placeService.searchPlace(query),
          datarestaurant: this.restaurantService.getRestaurant(),
     
        }).pipe(
          mergeMap(({ datanominatimplace, datarestaurant }) => {
           
            const featuresnominatimplace:any[] = datanominatimplace?.features ?? [];
            const featuresrestaurant :any[]= datarestaurant?.features ?? [];
           

            const listrestaurant = featuresrestaurant.map(f =>
              RestaurantModel.fromFeature(f)
            );

     

            const listnominatimplace = featuresnominatimplace
              .filter(f => {
                const p = f['properties'];
                return (
                  p &&
                  ((p.category === 'amenity' && p.type === 'restaurant'))
                );
              })
              .map(f => NominatimPlace.fromJson(f));

            const restaurantMap = new Map(
              listrestaurant.map(r => [r.osmId, r])
            );
         

           const places: NominatimPlace[] = listnominatimplace.filter(
              np => restaurantMap.has(np.osmId) 
            );
   if (!places.length) {
            return of(
              findBySearchRouteSuccess({ resultsRestaurant: null })
            );
          }
               const requests = places.map((p) =>
            this.restaurantService.getRestaurantById(+p.osmId)
          );

          return forkJoin(requests).pipe(
          
            map((responses) => {
              const restaurants: RestaurantModel[] = [];

              responses.forEach((res) => {
                const features = res?.features ?? [];
                restaurants.push(
                  ...features.map((f: any) =>
                    RestaurantModel.fromFeature(f)
                  )
                );
              });

              return restaurants;
            }),

          
            switchMap((restaurants) =>
              addReviewToRestaurant(
                restaurants,
                this.reviewService
              )
            ),

         
            map((restaurantMap) =>
              findBySearchRouteSuccess({
                resultsRestaurant:
                  restaurantMap.size > 0
                    ? Array.from(restaurantMap.values())[0]
                    : null,
              })
            ),

            catchError((e) =>
              of(
                findBySearchRouteFailure({
                  error:
                    e?.message ?? 'Find by search failed',
                })
              )
            )
          );
          }),
          catchError(e =>
            of( findBySearchRouteFailure({
                  error:
                    e?.message ?? 'Find by search failed',
                }))
          )
        );
      })
    )
  );


 findbyPick$ = createEffect(() =>
  this.actions$.pipe(
    ofType(findByPick),

    switchMap(({ place }) =>
      this.restaurantService
        .getRestaurantById(+place.osmId)
        .pipe(
      
          map((dataRestaurant) => {
            const featuresRestaurant: any[] =
              dataRestaurant?.features ?? [];

            return featuresRestaurant.map((f: any) =>
              RestaurantModel.fromFeature(f)
            );
          }),

    
          switchMap((restaurants) =>
            addReviewToRestaurant(
              restaurants,
              this.reviewService
            )
          ),

      
          map((restaurantMap) =>
            findByPickSuccess({
              restaurant:
                restaurantMap.size > 0
                  ? Array.from(restaurantMap.values())[0]
                  : null,
            })
          ),

        
          catchError((e) =>
            of(
              findByPickFailure({
                error:
                  e?.message ?? 'Find by search failed',
              })
            )
          )
        )
    )
  )
);

getRoute$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getRoute),
    switchMap(({ start, end }: any) =>
      this.routeService
        .getRoute({
          startLat: start.lat,
          startLng: start.lng,
          endLat: end.lat,
          endLng: end.lng,
        })
        .pipe(
        
          map((data) => {
          const resultRoute: RouteResult = RouteResult.fromJson(data);

console.log('RouteResult:', resultRoute);
console.log(' Route points:', resultRoute.points)

            return getRouteSuccess({
              route: resultRoute,
            });
          }),

          catchError((e:Error) =>
            of(getRouteFailure({error:e.message}))
          )
        )
    )
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
}
