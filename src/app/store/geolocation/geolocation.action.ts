// geolocation.actions.ts
import { createAction, props } from '@ngrx/store';
import { LatLng } from '../../services/route/route';


export const requestLocationPermission = createAction(
  '[Geolocation] Request Permission'
);

export const locationPermissionGranted = createAction(
  '[Geolocation] Permission Granted'
);

export const locationPermissionDenied = createAction(
  '[Geolocation] Permission Denied'
);

export const getCurrentLocation = createAction(
  '[Geolocation] Get Current Location'
);

export const getCurrentLocationSuccess = createAction(
  '[Geolocation] Get Current Location Success',
  props<{ location: LatLng }>()
);

export const getCurrentLocationFailure = createAction(
  '[Geolocation] Get Current Location Failure',
  props<{ error: string }>()
);
