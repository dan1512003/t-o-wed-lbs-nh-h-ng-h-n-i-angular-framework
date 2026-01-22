

import { WardModel } from '../../model/ward/ward.model';
import { loadRestaurantByWard, loadRestaurantByWardFailure, loadRestaurantByWardSuccess } from './restaurantward.actions';

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

describe('RestaurantByWard Actions', () => {

  it('should create loadRestaurantByWard action with query', () => {
  
    const action = loadRestaurantByWard();

    expect(action.type).toBe('[RestaurantWard] Load');
  
  });

  it('should create loadRestaurantByWardSuccess action with results mapped from mockSearchResponse', () => {
   const expectedResults = mockWardResponse.features.map(f => ({
        ward: WardModel.fromMap(f.properties),
        count: mockApiByIdWardResponse.features.length 
      }));

    const action = loadRestaurantByWardSuccess({data: expectedResults });

    expect(action.type).toBe('[RestaurantWard] Load Success');
    expect(action.data.length).toBe(3);
    expect(action.data[0].ward.osmId).toBe('19338089');
    expect(action.data[0].count).toBe(1);
   
  });

  it('should create loadRestaurantByWardFailure action with error', () => {
    const error = { message: 'Something went wrong' };
    const action = loadRestaurantByWardFailure({ error:error.message });

    expect(action.type).toBe('[RestaurantWard] Load Failure');
    expect(action.error).toEqual(error.message);
  });

});
