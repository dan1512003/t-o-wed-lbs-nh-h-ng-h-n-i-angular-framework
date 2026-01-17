
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { findBySearch, findBySearchFailure, findBySearchSuccess } from './restaurant.actions';
import { initialRestaurantSearchState, restaurantSearchReducer } from './restaurant.reducer';

describe('SearchReducer', () => {



  it('should set loading true and error null on search action', () => {
    const action = findBySearch({ query: 'Tokachiya Ramen' });
    const state = restaurantSearchReducer(initialRestaurantSearchState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
    expect(state.resultsRestaurant).toEqual([]);
  });

  it('should set results and loading false on searchSuccess', () => {
    const mockResults: RestaurantModel[] = [
    RestaurantModel.fromFeature({
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8488474,
                    21.0304724
                ]
            },
            "properties": {
                "full_id": "n10103088449",
                "osm_id": "10103088449",
                "price": null,
                "kids_area": null,
                "baby_feeding": null,
                "self_service": null,
                "website_me": null,
                "image": null,
                "bar": null,
                "indoor": null,
                "contact_in": null,
                "air_conditioning": null,
                "outdoor": null,
                "email": null,
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "+84438257338",
                "opening_hour": "Mo-Su 06:00-22:00",
                "cuisine": "vietnamese",
                "website": "http://www.pho10lyquocsu.com.vn",
                "addr_street": "Phố Lý Quốc Sư",
                "name": "Tokachiya Ramen",
                "payment": null,
                "diet": null,
                "starttime": null
            }
        },
       
           
    ]
})
    ];

    const action = findBySearchSuccess({ resultsRestaurant: mockResults });
    const state = restaurantSearchReducer(initialRestaurantSearchState, action);

    expect(state.resultsRestaurant).toEqual(mockResults);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set error and reset results on searchFailure', () => {
    const action = findBySearchFailure({ error: 'API Error' });
    const state = restaurantSearchReducer(initialRestaurantSearchState, action);

    expect(state.error).toBe('API Error');
    expect(state.resultsRestaurant).toEqual([]);
    expect(state.loading).toBeFalse();
  });

 
});
