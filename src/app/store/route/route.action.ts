// search-map.actions.ts
import { createAction, props } from '@ngrx/store';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { LatLng, RouteResult } from '../../services/route/route';


//action search
export const searchRoute = createAction(
  '[SearchMap] Search',
  props<{ query: string }>()
);

export const searchSuccessRoute = createAction(
  '[SearchMap] Search Success',
  props<{ results: NominatimPlace[] }>()
);

export const searchFailureRoute = createAction(
  '[SearchMap] Search Failure',
  props<{ error: string }>()
);

export const clearSearch = createAction('[SearchMap] Clear');


//action route
export const getRoute = createAction(
  '[SearchMap] Get Route',
  props<{ start: LatLng; end: LatLng }>()
);

export const getRouteSuccess = createAction(
  '[SearchMap] Get Route Success',
  props<{ route: RouteResult }>()
);

export const getRouteFailure = createAction(
  '[SearchMap] Get Route Failure',
  props<{ error: string }>()
);

// findbyseach
export const findBySearchRoute= createAction(
  '[SearchMap] Find By Search',
  props<{ query: string }>()
);

export const findBySearchRouteSuccess = createAction(
  '[SearchMap] Find By Search Success',
  props<{ resultsRestaurant:  RestaurantModel | null }>()
);

export const findBySearchRouteFailure = createAction(
  '[SearchMap] Find By Search Failure',
  props<{ error: string }>()
);

//actionspick
export const findByPick = createAction(
  '[SearchMap] Find By Pick',
  props<{ place: NominatimPlace }>()
);

export const findByPickSuccess = createAction(
  '[SearchMap] Find By Pick Success',
  props<{
    restaurant:  RestaurantModel | null;
  }>()
);
export const findByPickFailure = createAction(
  '[SearchMap] Find By Search Failure',
  props<{ error: string }>()
);
export const findFailure = createAction(
  '[SearchMap] Find Failure'
);
//restaurant id
export const loadRestaurantById = createAction(
  '[Restaurant Detail] Load By Id',
  props<{ id: number }>()
);

export const loadRestaurantByIdSuccess = createAction(
  '[Restaurant Detail] Load By Id Success',
  props<{ restaurant: RestaurantModel }>()
);

export const loadRestaurantByIdFailure = createAction(
  '[Restaurant Detail] Load By Id Failure',
  props<{ error: string }>()
);