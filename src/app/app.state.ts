import { RestaurantSearchState } from "./store/restaurant/restaurant.reducer";
import { RestaurantWardState } from "./store/restaurantward/restaurantward.reducer";
import { ReviewState } from "./store/reviews/review.reducer";
import { SearchMapState } from "./store/route/route.reducer";
import { SearchState } from "./store/search/search.reducer";
import { UserState } from "./store/user/user.reducer";


export interface AppState {
  search: SearchState,
  restaurantSearch: RestaurantSearchState,
  restaurantWard:RestaurantWardState,
  user:UserState,
  review:ReviewState,
  searchMap:SearchMapState,
  geolocation:Geolocation
}