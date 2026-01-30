// geolocation.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeolocationState } from './geolocation.reducer';


export const selectGeolocationState =
  createFeatureSelector<GeolocationState>('geolocation');

export const selectPermissionGranted = createSelector(
  selectGeolocationState,
  (state) => state.permissionGranted
);

export const selectCurrentLocation = createSelector(
  selectGeolocationState,
  (state) => state.currentLocation
);

export const selectGeoLoading = createSelector(
  selectGeolocationState,
  (state) => state.loading
);
