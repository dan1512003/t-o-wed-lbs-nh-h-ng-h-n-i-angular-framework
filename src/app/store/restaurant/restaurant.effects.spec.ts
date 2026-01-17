import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestScheduler } from 'rxjs/testing';
import { Place } from '../../services/place/place';
import { Restaurant } from '../../services/restaurant/restaurant';
import { Ward } from '../../services/ward/ward';
import { Action } from '@ngrx/store';
import { RestaurantEffects } from './restaurant.effects';
import { Review } from '../../services/review/review';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { findByClick, findByClickFailure, findByClickSuccess, findByMove, findByMoveFailure, findByMoveSuccess, findBySearch, findBySearchFailure, findBySearchSuccess } from './restaurant.actions';
import { ReviewModel } from '../../model/review/review.model';



describe('ShowsEffects', () => {

let effects: RestaurantEffects;
 let actions = new Observable<Action>();
  const placeSpy = jasmine.createSpyObj('Place', ['searchPlace']);
  const restaurantSpy = jasmine.createSpyObj('Restaurant',
   ['getRestaurant',
    'getRestaurantByIdWard',
    'getRestaurantById',
    'getRestaurantBound'
 
  ]);
  const wardSpy = jasmine.createSpyObj('Ward', ['getWard',   'getWardByLatLon']);
  const reviewSpy =jasmine.createSpyObj('Review',['getReview'])
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RestaurantEffects,
        provideMockActions(() => actions),
        { provide: Place, useValue: placeSpy },
        { provide: Restaurant, useValue: restaurantSpy },
        { provide: Ward, useValue: wardSpy },
        {provide:Review,useValue:reviewSpy},
      ]
    });

    effects = TestBed.inject(RestaurantEffects);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
describe('search$', () => {
  //TEST SEARCH
   const mockSearchResponse = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          osm_id: '10103088449',
          category: 'amenity',
          type: 'restaurant',
          name: 'Tokachiya Ramen',
          display_name: 'Tokachiya Ramen, 647B, Phố Kim Mã, Hà Nội'
        },
        geometry: { type: 'Point', coordinates: [105.8069828, 21.0291169] }
      },
//       {
//     type:"Feature",
//     properties:
//     {
//     osm_id:19338089,
//     category:"boundary",
//     type:"administrative",
//     name:"Xã Trung Giã",
//     display_name:"Xã Trung Giã, Hà Nội, Việt Nam"
// },
// geometry:{type: "Point","coordinates": [105.8324511, 21.3314675]}
// }
    ]
  };

    const mockApiGetRestaurantResponse ={
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.8434161, 21.0262611]
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
        "phone": "+84439428162",
        "opening_hour": "Mo-Su 06:45-22:00",
        "cuisine": "vietnamese",
        "website": "https://ngonhanoi.com.vn/",
        "addr_street": "Phố Phan Bội Châu",
        "name": "Tokachiya Ramen",
        "payment": null,
        "diet": null,
        "starttime": null
      }
    }
  ]
};
 const mockReviewResponse = [
    {
      id: 1,
      ratefood: 3,
      rateservice: 3,
      rateambience: 3,
      overallrating: 3,
      command: 'good',
      id_restaurant: '10103088449',
      email: 'test@example.com',
      date: '01/12/2025 15:30:45',
      like: null,
    },
   
  ];
 const mockGetWardResponse = {
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
                }
                ]
        }

           const mockApiGetRestaurantByIdWardResponse ={
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
}
           const mockApiGetRestaurantById={
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
}

    it('should dispatch searchSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: findBySearch({ query: 'Tokachiya Ramen' }) });

      

        placeSpy.searchPlace.and.returnValue(cold('--x|', { x: mockSearchResponse }));
        restaurantSpy.getRestaurant.and.returnValue(cold('--y|', { y: mockApiGetRestaurantResponse }));
        restaurantSpy.getRestaurantByIdWard.and.returnValue(cold('--y|', { y: mockApiGetRestaurantByIdWardResponse}));
        restaurantSpy.getRestaurantById.and.returnValue(cold('--y|', { y: mockApiGetRestaurantById}));
        wardSpy.getWard.and.returnValue(cold('--z|', { z: mockGetWardResponse }));
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));
            
        const restaurants=[{
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
}]
        let resultsRestaurant: RestaurantModel[] =[]
                  for (const restaurant of restaurants){

               const featuresRestaurant: any[] = restaurant['features'];
               resultsRestaurant.push(
              ...featuresRestaurant.map(f => RestaurantModel.fromFeature(f))
                );

          }
          const reviews: ReviewModel[] =
          mockReviewResponse.map(d => ReviewModel.fromJson(d));
          const restaurantMap = new Map<string, RestaurantModel>();
          resultsRestaurant.forEach(r => {
          restaurantMap.set(r.osmId, r);
        });
  
     
        reviews.forEach(r => {
          const res = restaurantMap.get(r.idRestaurant);
          if (res) {
            res.overallRating += r.overallrating ?? 0;
            res.ratefood += r.ratefood ?? 0;
            res.rateambience += r.rateambience ?? 0;
            res.rateservice += r.rateservice ?? 0;
            res.reviewCount += 1;
          }
        });
    const expectedResults = Array.from(restaurantMap.values())

    
        expectObservable(effects.findBySearch$).toBe('---------b', {
          b: findBySearchSuccess({ resultsRestaurant: expectedResults })
        });
      });
    });

    it('should dispatch searchSuccess with empty array when query is empty', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions = hot('-a', { a: findBySearch({ query: '' }) });
        expectObservable(effects.findBySearch$).toBe('-b', {
          b: findBySearchSuccess({ resultsRestaurant: [] })
        });
      });
    });
    it('should dispatch searchFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: findBySearch({ query: 'restaurant' }) });

       
      

        placeSpy.searchPlace.and.returnValue( cold('--#|', {}, new Error('API error')));
        restaurantSpy.getRestaurant.and.returnValue(cold('--y|', { y: mockApiGetRestaurantResponse }));
        restaurantSpy.getRestaurantByIdWard.and.returnValue(cold('--y|', { y: mockApiGetRestaurantByIdWardResponse}));
        restaurantSpy.getRestaurantById.and.returnValue(cold('--y|', { y: mockApiGetRestaurantById}));
        wardSpy.getWard.and.returnValue(cold('--z|', { z: mockGetWardResponse }));
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

        expectObservable(effects.findBySearch$).toBe('---b', {
          b: findBySearchFailure({ error: 'API error' })
        });
      });
    });

  });

  //TeST fIND bY mOVE
describe('findByMove$',()=>{
  const mockApiRestaurantBoundResponse = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8434161,
                    21.0262611
                ]
            },
            "properties": {
                "full_id": "n721836715",
                "osm_id": "721836715",
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
                "phone": "+84439428162",
                "opening_hour": "Mo-Su 06:45-22:00",
                "cuisine": "vietnamese",
                "website": "https://ngonhanoi.com.vn/",
                "addr_street": "Phố Phan Bội Châu",
                "name": "Quán Ăn Ngon - Phan Bội Châu",
                "payment": null,
                "diet": null,
                "starttime": null
            }
        },
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
                "name": "Quán Ăn Ngon - Phan Bội Châu",
                "payment": null,
                "diet": null,
                "starttime": null
            }
        },
        
    ]
}

 const mockReviewResponse = [
    {
      id: 1,
      ratefood: 3,
      rateservice: 3,
      rateambience: 3,
      overallrating: 3,
      command: 'good',
      id_restaurant: '721836715',
      email: 'test@example.com',
      date: '01/12/2025 15:30:45',
      like: null,
    },
   
  ];
      it('should dispatch moveSuccess with results when query is valid', () => {
        

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: findByMove( 
{ minLon : 105.84,
minLat: 21.02,
maxLon : 105.86,
maxLat : 21.035}) });

    
        restaurantSpy.getRestaurantBound.and.returnValue(cold('--y|', { y: mockApiRestaurantBoundResponse }));
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));
            
        const restaurants={
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8434161,
                    21.0262611
                ]
            },
            "properties": {
                "full_id": "n721836715",
                "osm_id": "721836715",
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
                "phone": "+84439428162",
                "opening_hour": "Mo-Su 06:45-22:00",
                "cuisine": "vietnamese",
                "website": "https://ngonhanoi.com.vn/",
                "addr_street": "Phố Phan Bội Châu",
                "name": "Quán Ăn Ngon - Phan Bội Châu",
                "payment": null,
                "diet": null,
                "starttime": null
            }
        },
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
                "name": "Quán Ăn Ngon - Phan Bội Châu",
                "payment": null,
                "diet": null,
                "starttime": null
            }
        },
        
    ]
}
       const featuresRestaurant: any[] = restaurants['features'];
       const resultsRestaurant= featuresRestaurant.map(f => RestaurantModel.fromFeature(f));
          const reviews: ReviewModel[] =
          mockReviewResponse.map(d => ReviewModel.fromJson(d));
          const restaurantMap = new Map<string, RestaurantModel>();
          resultsRestaurant.forEach(r => {
          restaurantMap.set(r.osmId, r);
        });
  
     
        reviews.forEach(r => {
          const res = restaurantMap.get(r.idRestaurant);
          if (res) {
            res.overallRating += r.overallrating ?? 0;
            res.ratefood += r.ratefood ?? 0;
            res.rateambience += r.rateambience ?? 0;
            res.rateservice += r.rateservice ?? 0;
            res.reviewCount += 1;
          }
        });
    const expectedResults = Array.from(restaurantMap.values())

    
        expectObservable(effects.findByMove$).toBe('305ms b', {
          b:  findByMoveSuccess({ resultsRestaurant: expectedResults })
        });
      });
    });

  
    it('should dispatch moveFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: findByMove( 
{ minLon : 105.84,
minLat: 21.02,
maxLon : 105.86,
maxLat : 21.035})});
        restaurantSpy.getRestaurantBound.and.returnValue(cold('--#|',{},new Error('API error')));
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

        expectObservable(effects.findByMove$).toBe('303ms b', {
          b: findByMoveFailure({ error: 'API error' })
        });
      });
    });
}),

//Test findByClick
describe('findByClick$',()=>{
   const mockWardResponse= {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                          
                        ]
                    },
                    "properties": {
                        "full_id": "r19331651",
                        "osm_id": "19331651",
                        "name": "Phường Hoàn Kiếm",
                        "name_en": "Hoan Kiem Ward"
                    }
                }
            ]
        }

                const mockApiGetRestaurantByIdWardResponse ={
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
}

 const mockReviewResponse = [
    {
      id: 1,
      ratefood: 3,
      rateservice: 3,
      rateambience: 3,
      overallrating: 3,
      command: 'good',
      id_restaurant: '10103088449',
      email: 'test@example.com',
      date: '01/12/2025 15:30:45',
      like: null,
    },
   
  ];
      it('should dispatch clickSuccess with results when query is valid', () => {
        

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: findByClick( 
{ lat :21.0285,
  lon : 105.8542}) });

    
        wardSpy.getWardByLatLon.and.returnValue(cold('--y|', { y: mockWardResponse }));
        restaurantSpy.getRestaurantByIdWard.and.returnValue(cold('--y|', { y: mockApiGetRestaurantByIdWardResponse}));
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));
            
        const restaurants={
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
}
         const featuresRestaurant: any[] = restaurants['features'];
          const resultsRestaurant= featuresRestaurant.map(f => RestaurantModel.fromFeature(f));
          const reviews: ReviewModel[] =
          mockReviewResponse.map(d => ReviewModel.fromJson(d));
          const restaurantMap = new Map<string, RestaurantModel>();
          resultsRestaurant.forEach(r => {
          restaurantMap.set(r.osmId, r);
        });
  
     
        reviews.forEach(r => {
          const res = restaurantMap.get(r.idRestaurant);
          if (res) {
            res.overallRating += r.overallrating ?? 0;
            res.ratefood += r.ratefood ?? 0;
            res.rateambience += r.rateambience ?? 0;
            res.rateservice += r.rateservice ?? 0;
            res.reviewCount += 1;
          }
        });
    const expectedResults = Array.from(restaurantMap.values())

    
        expectObservable(effects.findByClick$).toBe('-------b', {
          b:  findByClickSuccess({ resultsRestaurant: expectedResults })
        });
      });
    });

  
    it('should dispatch clickFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: findByClick( 
{ lat :21.0285,
  lon : 105.8542}) });
         wardSpy.getWardByLatLon.and.returnValue(cold('--#|',{},new Error('API error')));
         restaurantSpy.getRestaurantByIdWard.and.returnValue(cold('--y|', { y: mockApiGetRestaurantByIdWardResponse}));
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

        expectObservable(effects.findByClick$).toBe('---b', {
          b:findByClickFailure({ error: 'API error' })
        });
      });
    });
})
  
});
