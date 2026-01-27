import { createAction, props } from "@ngrx/store";
import { RestaurantModel } from "../../model/restaurant/restaurant.model";


//Tìm các nhà hàng khi search
export const findBySearch = createAction(
  '[Search] Find By Search',
  props<{ query: string  }>()
);

export const findBySearchSuccess = createAction(
  '[Search] Find By Search Success',
  props<{ resultsRestaurant: RestaurantModel[] }>()
);

export const findBySearchFailure = createAction(
  '[Search] Find By Search Failure',
  props<{ error: string }>()
);

//Tìm các nhà hàng khi di chuyển 


export const findByMove = createAction(
  '[Restaurant Map] Find By Move',
  props<{
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;

  }>()
);

export const findByMoveSuccess = createAction(
  '[Restaurant API] Find By Move Success',
  props<{ resultsRestaurant: RestaurantModel[] }>()
);

export const findByMoveFailure = createAction(
  '[Restaurant API] Find By Move Failure',
  props<{ error: string }>()
);


//Tìm nhà hàng khi click vào map

export const findByClick = createAction(
  '[Restaurant Map] Find By Click',
  props<{
    lat: number;
    lon: number;
  }>()
);

export const findByClickSuccess = createAction(
  '[Restaurant API] Find By Click Success',
  props<{ resultsRestaurant: RestaurantModel[] }>()
);

export const findByClickFailure = createAction(
  '[Restaurant API] Find By Click Failure',
  props<{ error: string }>()
);

// load detail
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
