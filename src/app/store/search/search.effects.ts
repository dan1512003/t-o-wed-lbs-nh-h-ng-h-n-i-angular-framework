import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Place } from '../../services/place/place';
import { Restaurant } from '../../services/restaurant/restaurant';
import { Ward } from '../../services/ward/ward';
import { search, searchSuccess, searchFailure } from './search.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';  // <-- operators
import { of, forkJoin } from 'rxjs';                        // <-- creation functions
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { WardModel } from '../../model/ward/ward.model';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';


@Injectable()
export class SearchEffects {

     search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
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
            const featuresnominatimplace: any[] = datanominatimplace['features'] ?? [];
            const featuresrestaurant: any[] = datarestaurant['features'] ?? [];
            const featuresward: any[] = dataward['features'] ?? [];

        
            const listrestaurant: RestaurantModel[] = featuresrestaurant.map(f =>
              RestaurantModel.fromFeature(f)
            );
            const listward: WardModel[] = featuresward.map(f =>
              WardModel.fromMap(f['properties'])
            );

            const listnominatimplace: NominatimPlace[] = featuresnominatimplace
              .filter(f => {
                const p = f['properties'];
                if (!p) return false;
                return (p['category'] === 'amenity' && p['type'] === 'restaurant') ||
                       (p['category'] === 'boundary' && p['type'] === 'administrative');
              })
              .map(f => NominatimPlace.fromJson(f));

         
            const restaurantMap = new Map(listrestaurant.map(r => [r.osmId, r]));
            const wardMap = new Map(listward.map(w => [w.osmId, w]));

        
            const results = listnominatimplace.filter(np =>
              restaurantMap.has(np.osmId) || wardMap.has(np.osmId)
            );

            return searchSuccess({ results });
          }),
          catchError(error => of(searchFailure({ error })))
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
