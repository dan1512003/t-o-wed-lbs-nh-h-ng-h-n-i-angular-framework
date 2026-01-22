import { createAction, props } from '@ngrx/store';
import { WardModel } from '../../model/ward/ward.model';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { DietModel } from '../../model/diet/diet.model';


export interface WardRestaurantCount {
  ward: WardModel;
  count: number;
}
export const loadRestaurantByWard = createAction(
  '[RestaurantWard] Load'
);

export const loadRestaurantByWardSuccess = createAction(
  '[RestaurantWard] Load Success',
  props<{ data: WardRestaurantCount[] }>()
);

export const loadRestaurantByWardFailure = createAction(
  '[RestaurantWard] Load Failure',
  props<{ error: string }>()
);


//AVAIL 
export const loadRestaurantAvail = createAction(
  '[Restaurant] Load Avail',
  props<{ osmId: string }>()
);
export const loadRestaurantAvailSuccess = createAction(
  '[Restaurant] Load Avail Success',
  props<{ data: RestaurantModel[] }>()
);
export const loadRestaurantAvailFailure = createAction(
  '[Restaurant] Load Avail Failure',
  props<{ error: string }>()
);

//HIGH RATE 
export const loadRestaurantHighRate = createAction(
  '[Restaurant] Load High Rate',
  props<{ osmId: string }>()
);
export const loadRestaurantHighRateSuccess = createAction(
  '[Restaurant] Load High Rate Success',
  props<{ data: RestaurantModel[] }>()
);
export const loadRestaurantHighRateFailure = createAction(
  '[Restaurant] Load High Rate Failure',
  props<{ error: any }>()
);

//NEWRES
export const loadRestaurantNew = createAction(
  '[Restaurant] Load New',
  props<{ osmId: string }>()
);
export const loadRestaurantNewSuccess = createAction(
  '[Restaurant] Load New Success',
  props<{ data: RestaurantModel[] }>()
);
export const loadRestaurantNewFailure = createAction(
  '[Restaurant] Load New Failure',
  props<{ error: any }>()
);

// CUISINE 
export const loadCuisine = createAction(
  '[Restaurant] Load Cuisine',
  props<{ osmId: string }>()
);
export const loadCuisineSuccess = createAction(
  '[Restaurant] Load Cuisine Success',
  props<{ data: DietModel[] }>()
);
export const loadCuisineFailure = createAction(
  '[Restaurant] Load Cuisine Failure',
  props<{ error: any }>()
);

//Cuisine Restaurant
export const loadRestaurantCuisine = createAction(
  '[Restaurant] Load Cuisine Restaurant',
  props<{ osmId: string; cuisine: string }>()
);

export const loadRestaurantCuisineSuccess = createAction(
  '[Restaurant] Load Cuisine Restaurant Success',
  props<{ data: RestaurantModel[] }>()
);

export const loadRestaurantCuisineFailure = createAction(
  '[Restaurant] Load Cuisine Restaurant Failure',
  props<{ error: string }>()
);