import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Place } from '../../services/place/place';
import { Restaurant } from '../../services/restaurant/restaurant';
import { Ward } from '../../services/ward/ward';
import { search, searchSuccess, searchFailure } from './search.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';                      
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { WardModel } from '../../model/ward/ward.model';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';


@Injectable()
export class SearchEffects {

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),

     
      map(action => {
        console.log('ACTION RECEIVED:', action);
        return action;
      }),

      mergeMap(({ query }) => {
       

        if (!query.trim()) {
       
          return of(searchSuccess({ results: [] }));
        }

  

        return forkJoin({
          datanominatimplace: this.placeService.searchPlace(query),
          datarestaurant: this.restaurantService.getRestaurant(),
          dataward: this.wardService.getWard()
        }).pipe(

      
          map(({ datanominatimplace, datarestaurant, dataward }) => {
            console.log('RAW NOMINATIM:', datanominatimplace);
            console.log('RESTAURANT:', datarestaurant);
            console.log(' WARD:', dataward);

            const featuresnominatimplace: any[] = datanominatimplace?.features ?? [];
            const featuresrestaurant: any[] = datarestaurant?.features ?? [];
            const featuresward: any[] = dataward?.features ?? [];

            console.log('FEATURES COUNT:', {
              nominatim: featuresnominatimplace.length,
              restaurant: featuresrestaurant.length,
              ward: featuresward.length
            });

            const listrestaurant: RestaurantModel[] =
              featuresrestaurant.map(f => RestaurantModel.fromFeature(f));

            const listward: WardModel[] =
              featuresward.map(f => WardModel.fromMap(f['properties']));

            const listnominatimplace: NominatimPlace[] =
              featuresnominatimplace
                .filter(f => {
                  const p = f['properties'];
                  return !!p && (
                    (p['category'] === 'amenity' && p['type'] === 'restaurant') ||
                    (p['category'] === 'boundary' && p['type'] === 'administrative')
                  );
                })
                .map(f => NominatimPlace.fromJson(f));

            console.log('AFTER MAP:', {
              restaurants: listrestaurant.length,
              wards: listward.length,
              nominatim: listnominatimplace.length
            });

            const restaurantMap = new Map(
              listrestaurant.map(r => [r.osmId, r])
            );

            const wardMap = new Map(
              listward.map(w => [w.osmId, w])
            );

            const results = listnominatimplace.filter(np =>
              restaurantMap.has(np.osmId) || wardMap.has(np.osmId)
            );

            console.log('FINAL RESULTS:', results);

            return searchSuccess({ results });
          }),

         
          catchError(error => {
            console.error('ERROR:', error);
            return of(searchFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private restaurantService: Restaurant,
    private wardService: Ward,
    private placeService: Place
  ) {}
}

