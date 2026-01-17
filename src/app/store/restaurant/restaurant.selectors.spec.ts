import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RestaurantSearchState } from './restaurant.reducer';


export const selectSearchState = createFeatureSelector<RestaurantSearchState>('restaurantSearch');


export const selectResults = createSelector(
  selectSearchState,
  (state) => {
   
   
    return state.resultsRestaurant;
  }
);


export const selectLoading = createSelector(
  selectSearchState,
  (state) => {
   
    return state.loading;
  }
);


export const selectError = createSelector(
  selectSearchState,
  (state) => {


    return state.error;
  }
);
