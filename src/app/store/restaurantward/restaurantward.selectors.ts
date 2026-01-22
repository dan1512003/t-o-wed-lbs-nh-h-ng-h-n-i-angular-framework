import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RestaurantWardState } from './restaurantward.reducer';


export const selectRestaurantWardState =
  createFeatureSelector<RestaurantWardState>('restaurantWard');

//selector by war
export const selectRestaurantWardData = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantward.data
);

export const selectRestaurantWardLoading = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantward.loading
);

export const selectRestaurantWardError = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantward.error
);

//selector by avail
export const selectRestaurantAvailData = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantAvail.data
);

export const selectRestaurantAvailLoading = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantAvail.loading
);

export const selectRestaurantAvailError = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantAvail.error
);

//selector by highrate
export const selectRestaurantHighRateData = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantHighRate.data
);

export const selectRestaurantHighRateLoading = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantHighRate.loading
);

export const selectRestaurantHighRateError = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantHighRate.error
);

//selector by new
export const selectRestaurantNewData = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantNew.data
);

export const selectRestaurantNewLoading = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantNew.loading
);

export const selectRestaurantNewError = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantNew.error
);

//selector by cuisine
export const selectCuisineData = createSelector(
  selectRestaurantWardState,
  (state) => state.cuisine.data
);

export const selectCuisineLoading = createSelector(
  selectRestaurantWardState,
  (state) => state.cuisine.loading
);

export const selectCuisineError = createSelector(
  selectRestaurantWardState,
  (state) => state.cuisine.error
);

//selector by restaurant cuisine
export const selectRestaurantCuisineData = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantCusine.data
);

export const selectRestaurantCuisineLoading = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantCusine.loading
);

export const selectRestaurantCuisineError = createSelector(
  selectRestaurantWardState,
  (state) => state.restaurantCusine.error
);