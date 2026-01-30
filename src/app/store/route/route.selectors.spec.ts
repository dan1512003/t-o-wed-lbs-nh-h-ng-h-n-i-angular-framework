
import { SearchMapState } from "./route.reducer";
import { selectRestaurant, selectResults, selectRoute } from "./route.selectors";




describe('Route Selectors', () => {



 const initialSearchMapState: SearchMapState = {
  results: [],
  resultRestaurant: null,
  routeResult: null,
  loading: false,
  error: null,
};


  it('selectResults ', () => {
    expect(selectResults.projector(initialSearchMapState)).toEqual([]);
  });
 it('selectRoute', () => {
    expect(selectRoute.projector(initialSearchMapState)).toEqual(null);
  });

 it('selectRestaurant', () => {
 expect(selectRestaurant.projector(initialSearchMapState)).toEqual(null);
  });

 

});
