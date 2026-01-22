
import { WardModel } from '../../model/ward/ward.model';
import { loadRestaurantByWard, loadRestaurantByWardFailure, loadRestaurantByWardSuccess } from './restaurantward.actions';
import { initialRestaurantWardState, restaurantWardReducer } from './restaurantward.reducer';

describe('restaurantWardReducer', () => {



  it('should set loading true and error null on loadRestaurantByWard action', () => {
    const action =loadRestaurantByWard();
    const state = restaurantWardReducer(initialRestaurantWardState, action);
    expect(state.restaurantward.loading).toBeTrue();
    expect(state.restaurantward.error).toBeNull();
  
  });

  it('should set data and loading false on loadRestaurantByWardSuccess', () => {
    const mockApiByIdWardResponse ={
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
                "full_id": "n773601261",
                "osm_id": "773601261",
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
                "name": "Pho 10",
                "payment": null,
                "diet": null,
                "starttime": null
            }
        },
      
    ]
}

  const mockWardResponse =  {
            "type": "FeatureCollection",
            "features":
            [ {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            
                              
                        ]
                    },
                    "properties": {
                        "full_id": "r19338089",
                        "osm_id": "19338089",
                        "name": "Xã Trung Giã",
                        "name_en": "Trung Gia Commune",
                        "image": "https://resource.kinhtedothi.vn/resources2025/1/users/49/soc-son-3-1755610860.jpeg"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            
                              
                        ]
                    },
                    "properties": {
                        "full_id": "r19338090",
                        "osm_id": "19338090",
                        "name": "Xã Kim Anh",
                        "name_en": "Kim Anh Commune",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREnTUJmur1TSqOxK8_KG86dgOq51dtQYX6TQ&s"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                           
                        ]
                    },
                    "properties": {
                        "full_id": "r19331655",
                        "osm_id": "19331655",
                        "name": "Phường Văn Miếu - Quốc Tử Giám",
                        "name_en": "Van Mieu - Quoc Tu Giam Ward",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ429EbnsvQbEOuhzXAxLc3a5x4FUYLt4ZVBQ&s"
                    }
                },
               
                ]
        }
 const expectedResults = mockWardResponse.features.map(f => ({
        ward: WardModel.fromMap(f.properties),
        count: mockApiByIdWardResponse.features.length 
      }));

    const action = loadRestaurantByWardSuccess({ data: expectedResults });
     const state = restaurantWardReducer(initialRestaurantWardState, action);

    expect(state.restaurantward.data).toEqual(expectedResults);
    expect(state.restaurantward.loading).toBeFalse();
    expect(state.restaurantward.error).toBeNull();
  });

  it('should set error and reset results on searchFailure', () => {
    const action = loadRestaurantByWardFailure({ error: 'API Error' });
    const state = restaurantWardReducer(initialRestaurantWardState, action);

    expect(state.restaurantward.error).toBe('API Error');
    expect(state.restaurantward.data).toEqual([]);
    expect(state.restaurantward.loading).toBeFalse();
  });

 
});