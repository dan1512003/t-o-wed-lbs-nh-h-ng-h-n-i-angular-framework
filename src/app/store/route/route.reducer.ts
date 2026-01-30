import { createReducer, on } from '@ngrx/store';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { RouteResult } from '../../services/route/route';

import {

  clearSearch,
  getRoute,
  getRouteSuccess,
  getRouteFailure,
  findByPick,
  findByPickSuccess,
  findFailure,
  findBySearchRoute,
  findBySearchRouteSuccess,
  findBySearchRouteFailure,
  findByPickFailure,
  searchRoute,
  searchSuccessRoute,
  searchFailureRoute,
  loadRestaurantById,
  loadRestaurantByIdSuccess,
  loadRestaurantByIdFailure,
} from './route.action';

export interface SearchMapState {
  results: NominatimPlace[];
  resultRestaurant: RestaurantModel | null;
  routeResult: RouteResult | null;
  loading: boolean;
  error: string | null;
}

export const initialSearchMapState: SearchMapState = {
  results: [],
  resultRestaurant: null,
  routeResult: null,
  loading: false,
  error: null,
};


export const searchMapReducer = createReducer(
  initialSearchMapState,

  //reducer search
  on(searchRoute, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(searchSuccessRoute, (state, { results }) => ({
    ...state,
    results,
    loading: false,
  })),

  on(searchFailureRoute, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    results: [],
  })),

  on(clearSearch, (state) => ({
    ...state,
    results: [],
  })),

  // reducer findbysearch
  on(findBySearchRoute, (state) => ({
    ...state,
    loading: true,
    error: null,
    resultRestaurant: null,
  })),

  on(findBySearchRouteSuccess, (state, { resultsRestaurant }) => ({
    ...state,
    loading: false,
    resultRestaurant: resultsRestaurant
  })),

  on(findBySearchRouteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    resultRestaurant: null,
  })),

  //reducer findbypick
  on(findByPick, (state) => ({
    ...state,
    loading: true,
    error: null,
    resultRestaurant: null,
  })),

  on(findByPickSuccess, (state, { restaurant }) => ({
    ...state,
    loading: false,
    resultRestaurant: restaurant,
  })),
  on(findByPickFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    resultRestaurant: null,
  })),
  on(findFailure, (state) => ({
    ...state,
    loading: false,
    resultRestaurant: null,
  })),

  //reducer route
  on(getRoute, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(getRouteSuccess, (state, { route }) => ({
    ...state,
    loading: false,
    routeResult: route,
  })),

  on(getRouteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadRestaurantById, state => ({
    ...state,
    loading: true,
    error: null,
    resultRestaurant: null,
  })),
  
  on(loadRestaurantByIdSuccess, (state, { restaurant }) => ({
    ...state,
    loading: false,
    resultRestaurant: restaurant,
  })),
  
  on(loadRestaurantByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    resultRestaurant: null,
  })),
);
