// geolocation.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fromEventPattern, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { getCurrentLocation, getCurrentLocationFailure, getCurrentLocationSuccess, locationPermissionDenied, locationPermissionGranted, requestLocationPermission } from './geolocation.action';


@Injectable()
export class GeolocationEffects {
  constructor(private actions$: Actions) {}

requestPermission$ = createEffect(() =>
  this.actions$.pipe(
    ofType(requestLocationPermission),
    switchMap(() => {
      if (!navigator.geolocation) {
        return of(locationPermissionDenied());
      }

      return new Observable<boolean>((observer) => {
        navigator.geolocation.getCurrentPosition(
          () => {
            observer.next(true);
            observer.complete();
          },
          () => {
            observer.next(false);
            observer.complete();
          }
        );
      }).pipe(
        map((granted) =>
          granted
            ? locationPermissionGranted()
            : locationPermissionDenied()
        )
      );
    })
  )
);




getCurrentLocation$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getCurrentLocation),
    switchMap(() => {
      if (!navigator.geolocation) {
        return of(
          getCurrentLocationFailure({
            error: 'Geolocation not supported',
          })
        );
      }

      return new Observable<GeolocationPosition>((observer) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            observer.next(pos);
            observer.complete();
          },
          (err) => observer.error(err),
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      }).pipe(
        map((position) =>
          getCurrentLocationSuccess({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          })
        ),
        catchError((err) =>
          of(
            getCurrentLocationFailure({
              error: err.message ?? 'Failed to get location',
            })
          )
        )
      );
    })
  )
);

}
