import { createReducer, on } from '@ngrx/store';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { findByClick, findByClickFailure, findByClickSuccess, findByMove, findByMoveFailure, findByMoveSuccess, findBySearch, findBySearchFailure, findBySearchSuccess, loadRestaurantById, loadRestaurantByIdFailure, loadRestaurantByIdSuccess } from './restaurant.actions';


export interface RestaurantSearchState {
  resultsRestaurant: RestaurantModel[];
   selectedRestaurant: RestaurantModel | null;
  loading: boolean;
  error: string | null;
}

export const initialRestaurantSearchState: RestaurantSearchState = {
  resultsRestaurant: [],
   selectedRestaurant: null,
  loading: false,
  error: null,
};
export const restaurantSearchReducer = createReducer(
  initialRestaurantSearchState,

  on(findBySearch, (state) => ({
    ...state,
    loading: true,
    error: null,
    resultsRestaurant: [],
  })),

  on(findBySearchSuccess, (state, { resultsRestaurant }) => ({
    ...state,
    loading: false,
    resultsRestaurant,
  })),

  on(findBySearchFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    resultsRestaurant: [],
  })),
//ACTION MOVE
on(findByMove, (state) => ({
    ...state,
    loading: true,
    error: null,
    resultsRestaurant: [],
  })),

  on(findByMoveSuccess, (state, { resultsRestaurant }) => ({
    ...state,
    loading: false,
    resultsRestaurant,
  })),



  on(findByMoveFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    resultsRestaurant: [],
  })),
  //ACTION CLICK
on(findByClick, (state) => ({
  ...state,
  loading: true,
  error: null,
  resultsRestaurant: [],
})),

on(findByClickSuccess, (state, { resultsRestaurant }) => ({
  ...state,
  loading: false,
  resultsRestaurant,
})),

on(findByClickFailure, (state, { error }) => ({
  ...state,
  loading: false,
  error,
  resultsRestaurant: [],
})),

on(loadRestaurantById, state => ({
  ...state,
  loading: true,
  error: null,
  selectedRestaurant: null,
})),

on(loadRestaurantByIdSuccess, (state, { restaurant }) => ({
  ...state,
  loading: false,
  selectedRestaurant: restaurant,
})),

on(loadRestaurantByIdFailure, (state, { error }) => ({
  ...state,
  loading: false,
  error,
  selectedRestaurant: null,
})),

);


