import { createReducer, on } from '@ngrx/store';
import { loadCuisine, loadCuisineFailure, loadCuisineSuccess, loadRestaurantAvail, loadRestaurantAvailFailure, loadRestaurantAvailSuccess, loadRestaurantByWard, loadRestaurantByWardFailure, loadRestaurantByWardSuccess, loadRestaurantCuisine, loadRestaurantCuisineFailure, loadRestaurantCuisineSuccess, loadRestaurantHighRate, loadRestaurantHighRateFailure, loadRestaurantHighRateSuccess, loadRestaurantNew, loadRestaurantNewFailure, loadRestaurantNewSuccess, WardRestaurantCount } from './restaurantward.actions';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { DietModel } from '../../model/diet/diet.model';

export interface AsyncState<T> {
  data: T[];
  loading: boolean;
  error: any;
}


export interface RestaurantWardState {
 restaurantward:AsyncState<WardRestaurantCount>
 restaurantAvail: AsyncState<RestaurantModel>;
  restaurantHighRate: AsyncState<RestaurantModel>;
  restaurantNew: AsyncState<RestaurantModel>;
  cuisine: AsyncState<DietModel>;
  restaurantCusine: AsyncState<RestaurantModel>;
}

export const initialAsyncState = <T>(): AsyncState<T> => ({
  data: [],
  loading: false,
  error: null,
});
export const initialRestaurantWardState: RestaurantWardState = {
restaurantward:initialAsyncState(),
  restaurantAvail: initialAsyncState(),
  restaurantHighRate: initialAsyncState(),
  restaurantNew: initialAsyncState(),
  cuisine: initialAsyncState(),
  restaurantCusine:initialAsyncState()
};

export const restaurantWardReducer = createReducer(
  initialRestaurantWardState,

// RestaurantReducer
  on(loadRestaurantByWard, (state): RestaurantWardState => ({
    ...state,
    restaurantward: {
      ...state.restaurantward,
      loading: true,
      error: null,
    },
  })),


  on(loadRestaurantByWardSuccess, (state, { data }): RestaurantWardState => ({
    ...state,
    restaurantward: {
      data,
      loading: false,
      error: null,
    },
  })),

 
  on(loadRestaurantByWardFailure, (state, { error }): RestaurantWardState => ({
    ...state,
    restaurantward: {
       data:[],
      loading: false,
      error,
    },
  })),
  
  //ReducerAvail
  on(loadRestaurantAvail, (state) => ({
    ...state,
    restaurantAvail: { ...state.restaurantAvail, loading: true },
  })),
  on(loadRestaurantAvailSuccess, (state, { data }) => ({
    ...state,
    restaurantAvail: { data, loading: false, error: null },
  })),
  on(loadRestaurantAvailFailure, (state, { error }) => ({
    ...state,
    restaurantAvail: { ...state.restaurantAvail, loading: false, error },
  })),

  //ReducerHighRate
  on(loadRestaurantHighRate, (state) => ({
    ...state,
    restaurantHighRate: { ...state.restaurantHighRate, loading: true },
  })),
  on(loadRestaurantHighRateSuccess, (state, { data }) => ({
    ...state,
    restaurantHighRate: { data, loading: false, error: null },
  })),
  on(loadRestaurantHighRateFailure, (state, { error }) => ({
    ...state,
    restaurantHighRate: { ...state.restaurantHighRate, loading: false, error },
  })),

  //ReducerNew
  on(loadRestaurantNew, (state) => ({
    ...state,
    restaurantNew: { ...state.restaurantNew, loading: true },
  })),
  on(loadRestaurantNewSuccess, (state, { data }) => ({
    ...state,
    restaurantNew: { data, loading: false, error: null },
  })),
  on(loadRestaurantNewFailure, (state, { error }) => ({
    ...state,
    restaurantNew: { ...state.restaurantNew, loading: false, error },
  })),


  //ReduecerDiet
  on(loadCuisine, (state) => ({
    ...state,
    cuisine: { ...state.cuisine, loading: true },
  })),
  on(loadCuisineSuccess, (state, { data }) => ({
    ...state,
    cuisine: { data, loading: false, error: null },
  })),
  on(loadCuisineFailure, (state, { error }) => ({
    ...state,
    cuisine: { ...state.cuisine, loading: false, error },
  })),


  //Reducer Cuisine Restaurant
    on(loadRestaurantCuisine, (state) => ({
    ...state,
    restaurantCusine: { ...state.restaurantCusine, loading: true },
  })),
  on(loadRestaurantCuisineSuccess, (state, { data }) => ({
    ...state,
    restaurantCusine: { data, loading: false, error: null },
  })),
  on(loadRestaurantCuisineFailure, (state, { error }) => ({
    ...state,
    restaurantCusine: { ...state.restaurantCusine, loading: false, error },
  })),
);


