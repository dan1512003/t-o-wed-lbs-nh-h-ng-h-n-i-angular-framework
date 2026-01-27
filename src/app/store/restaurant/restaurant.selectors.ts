import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RestaurantSearchState } from "./restaurant.reducer";

export const selectRestaurantSearch =
  createFeatureSelector<RestaurantSearchState>('restaurantSearch');

export const selectResultsRestaurant = createSelector(
  selectRestaurantSearch,
  (state) => state.resultsRestaurant
);

export const selectLoadingRestaurant = createSelector(
  selectRestaurantSearch,
  (state) => state.loading
);

export const selectSelectedRestaurant = createSelector(
  selectRestaurantSearch,
  state => state.selectedRestaurant
);
