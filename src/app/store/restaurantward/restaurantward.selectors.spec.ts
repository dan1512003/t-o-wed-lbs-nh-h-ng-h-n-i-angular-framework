
import {  AsyncState } from './restaurantward.reducer';
import { selectRestaurantWardData, selectRestaurantWardError, selectRestaurantWardLoading } from './restaurantward.selectors';

describe('RestaurantWard Selectors', () => {


  const restaurantward: AsyncState<any> = {
    data: [],
    loading: true,
    error: null
  };

  const restaurantAvail: AsyncState<any> = {
    data: [],
    loading: false,
    error: 'error'
  };

  const restaurantHighRate: AsyncState<any> = {
    data: [],
    loading: true,
    error: 'error'
  };

  const restaurantNew: AsyncState<any> = {
    data: [],
    loading: false,
    error: 'error'
  };

  const cuisine: AsyncState<any> = {
    data: [],
    loading: true,
    error: 'error'
  };

   const restaurantCuisine: AsyncState<any> = {
    data: [],
    loading: false,
    error: 'error'
  };
  const initialRestaurantWardState: any = {
    restaurantward: restaurantward,
    restaurantAvail: restaurantAvail,
    restaurantHighRate: restaurantHighRate,
    restaurantNew: restaurantNew,
    cuisine: cuisine,
     restaurantCusine:restaurantCuisine
  };

  // restaurantward selectors
  it('should select restaurantward data', () => {
    expect(selectRestaurantWardData.projector(initialRestaurantWardState)).toEqual([]);
  });

  it('should select restaurantward loading', () => {
    expect(selectRestaurantWardLoading.projector(initialRestaurantWardState)).toBeTrue();
  });

  it('should select restaurantward error', () => {
    expect(selectRestaurantWardError.projector(initialRestaurantWardState)).toBeNull();
  });

 

});
