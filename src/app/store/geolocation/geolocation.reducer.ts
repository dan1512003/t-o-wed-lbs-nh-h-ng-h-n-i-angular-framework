// geolocation.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { LatLng } from '../../services/route/route';
import { getCurrentLocation, getCurrentLocationFailure, getCurrentLocationSuccess, locationPermissionDenied, locationPermissionGranted, requestLocationPermission } from './geolocation.action';



export interface GeolocationState {
  permissionGranted: boolean;
  currentLocation: LatLng | null;
  loading: boolean;
  error: string | null;
}

export const initialGeolocationState: GeolocationState = {
  permissionGranted: false,
  currentLocation: null,
  loading: false,
  error: null,
};

export const geolocationReducer = createReducer(
  initialGeolocationState,

  on(requestLocationPermission, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(locationPermissionGranted, (state) => ({
    ...state,
    permissionGranted: true,
    loading: false,
  })),

  on(locationPermissionDenied, (state) => ({
    ...state,
    permissionGranted: false,
    loading: false,
  })),

  on(getCurrentLocation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(getCurrentLocationSuccess, (state, { location }) => ({
    ...state,
    currentLocation: location,
    loading: false,
  })),

  on(getCurrentLocationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
