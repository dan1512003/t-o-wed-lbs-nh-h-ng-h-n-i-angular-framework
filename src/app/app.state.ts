import { RestaurantSearchState } from "./store/restaurant/restaurant.reducer";
import { SearchState } from "./store/search/search.reducer";


export interface AppState {
  search: SearchState;
  restaurantSearch: RestaurantSearchState;
}