import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { searchReducer } from './store/search/search.reducer';
import { SearchEffects } from './store/search/search.effects';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { RestaurantEffects } from './store/restaurant/restaurant.effects';
import { restaurantSearchReducer } from './store/restaurant/restaurant.reducer';
import { restaurantWardReducer } from './store/restaurantward/restaurantward.reducer';
import { RestaurantWardEffects } from './store/restaurantward/restaurantward.effects';
import { userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { reviewReducer } from './store/reviews/review.reducer';
import { ReviewEffects } from './store/reviews/review.effects';
import { searchMapReducer } from './store/route/route.reducer';
import { geolocationReducer } from './store/geolocation/geolocation.reducer';
import { SearchMapEffects } from './store/route/route.effects';
import { GeolocationEffects } from './store/geolocation/geolocation.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideStore({
      search: searchReducer,
      restaurantSearch:restaurantSearchReducer,
      restaurantWard:restaurantWardReducer,
      user:userReducer,
      review:reviewReducer,
      searchMap:searchMapReducer,
      geolocation:geolocationReducer
      
}),
    provideEffects([
      SearchEffects,
      RestaurantEffects,
      RestaurantWardEffects,
      UserEffects,
      ReviewEffects,
      SearchMapEffects,
      GeolocationEffects
    ]),
    provideHttpClient( withFetch()),
    
]
};
