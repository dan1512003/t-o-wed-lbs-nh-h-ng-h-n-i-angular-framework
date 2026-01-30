import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestScheduler } from 'rxjs/testing';
import { Place } from '../../services/place/place';
import { Restaurant } from '../../services/restaurant/restaurant';
import { Action } from '@ngrx/store';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { clearSearch, findByPick, findByPickFailure, findByPickSuccess, findBySearchRoute, findBySearchRouteFailure, findBySearchRouteSuccess, getRoute, getRouteFailure, getRouteSuccess, searchFailureRoute, searchRoute, searchSuccessRoute } from './route.action';
import { SearchMapEffects } from './route.effects';
import { Review } from '../../services/review/review';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { ReviewModel } from '../../model/review/review.model';
import { Route, RouteResult } from '../../services/route/route';



describe('ShowsEffects', () => {

  let effects:SearchMapEffects;
 let actions = new Observable<Action>();
  const placeSpy = jasmine.createSpyObj('Place', ['searchPlace']);
  const restaurantSpy = jasmine.createSpyObj('Restaurant',
   ['getRestaurant',
    'getRestaurantById',

 
  ]);
  const reviewSpy =jasmine.createSpyObj('Review',['getReview'])
   const routeSpy =jasmine.createSpyObj('Route',['getRoute'])
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchMapEffects,
        provideMockActions(() => actions),
        { provide: Place, useValue: placeSpy },
        { provide: Restaurant, useValue: restaurantSpy },
        { provide: Review, useValue: reviewSpy},
        { provide: Route, useValue: routeSpy},
      ]
    });

    effects = TestBed.inject(SearchMapEffects);


    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
describe('search$', () => {
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
      }
    ]
  };

  const mockApiResponse = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [105.8434161, 21.0262611] },
        properties: { osm_id: '10103088449', name: 'Quán Ăn Ngon' }
      }
    ]
  };

    it('should dispatch searchSuccessRoute with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: searchRoute({ query: 'Tokachiya Ramen' }) });

        const placeResponse = cold('--x|', { x: mockSearchResponse });
        const restaurantResponse = cold('--y|', { y: mockApiResponse });
    

        placeSpy.searchPlace.and.returnValue(placeResponse);
        restaurantSpy.getRestaurant.and.returnValue(restaurantResponse);
     

        const expectedResults = [
          NominatimPlace.fromJson(mockSearchResponse.features[0])
        ];

        expectObservable(effects.search$).toBe('----b', {
          b: searchSuccessRoute({ results:expectedResults }),
        });
      });
    });

    it('should dispatch searchSuccessRoute with empty array when query is empty', () => {
      testScheduler.run(({ hot, expectObservable }) => {
       actions = hot('-a', { a: searchRoute({ query: '' }) });
        expectObservable(effects.search$).toBe('-b', {
          b: clearSearch()
        });
      });
    });
    it('should dispatch searchFailureRoute when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
       actions = hot('-a', { a: searchRoute({ query: 'Tokachiya Ramen' }) });

       
        const placeResponse = cold('--#|', {}, new Error('API error'));
        const restaurantResponse = cold('--y|', { y: mockApiResponse });
     

        placeSpy.searchPlace.and.returnValue(placeResponse);
        restaurantSpy.getRestaurant.and.returnValue(restaurantResponse);


        expectObservable(effects.search$).toBe('---b', {
          b: searchFailureRoute({ error:'API error'})
        });
      });
    });

  });
describe('findBySearch$', () => {
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

    it('should dispatch  findBySearchRouteSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: findBySearchRoute({ query: 'Tokachiya Ramen' }) });

    
        placeSpy.searchPlace.and.returnValue(cold('--x|', { x: mockSearchResponse }));
        restaurantSpy.getRestaurant.and.returnValue(cold('--y|', { y: mockApiGetRestaurantResponse }));
    
        restaurantSpy.getRestaurantById.and.returnValue(cold('--y|', { y: mockApiGetRestaurantById}));
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


    
        expectObservable(effects.findBySearch$).toBe('---------b', {
          b: findBySearchRouteSuccess({
                          resultsRestaurant:
                            restaurantMap.size > 0
                              ? Array.from(restaurantMap.values())[0]
                              : null,
                        })
        });
      });
    });

    it('should dispatch findBySearchRouteSuccess with empty array when query is empty', () => {
      testScheduler.run(({ hot, expectObservable }) => {
         actions = hot('-a', { a: findBySearchRoute({ query: '' }) });
        expectObservable(effects.findBySearch$).toBe('-b', {
          b:   findBySearchRouteSuccess({ resultsRestaurant: null })
        });
      });
    });
    it('should dispatch searchFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
       actions = hot('-a', { a: findBySearchRoute({ query: 'Tokachiya Ramen' }) });

       
      

        placeSpy.searchPlace.and.returnValue( cold('--#|', {}, new Error('API error')));
        restaurantSpy.getRestaurant.and.returnValue(cold('--y|', { y: mockApiGetRestaurantResponse }));
        restaurantSpy.getRestaurantById.and.returnValue(cold('--y|', { y: mockApiGetRestaurantById}));
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

        expectObservable(effects.findBySearch$).toBe('---b', {
          b: findBySearchRouteFailure({
                            error:'API error'
                          })
        });
      });
    });

  });
  describe('findbyPick$', () => {

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

    it('should dispatch  findByPickSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: findByPick({ place: NominatimPlace.fromJson(mockSearchResponse.features[0])  }) });

    
      
    
        restaurantSpy.getRestaurantById.and.returnValue(cold('--y|', { y: mockApiGetRestaurantById}));
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));
            

 
        let resultsRestaurant: RestaurantModel[] =[]
          const featuresRestaurant: any[] =
              mockApiGetRestaurantById.features;

            resultsRestaurant= featuresRestaurant.map((f: any) =>
              RestaurantModel.fromFeature(f)
            );
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


    
        expectObservable(effects.findbyPick$).toBe('-----b', {
          b:    findByPickSuccess({
                        restaurant:
                          restaurantMap.size > 0
                            ? Array.from(restaurantMap.values())[0]
                            : null,
                      })
        });
      });
    });


    it('should dispatch findByPickFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
         actions = hot('-a', { a: findByPick({ place: NominatimPlace.fromJson(mockSearchResponse.features[0])  }) });

       
      


        restaurantSpy.getRestaurantById.and.returnValue( cold('--#|', {}, new Error('API error')));
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

        expectObservable(effects.findbyPick$).toBe('---b', {
          b:  findByPickFailure({
                          error:"API error"
                        })
        });
      });
    });

  });
    describe('getRoute$', () => {

   const mockResponseResultRoute =   {
    "legs": [
        {
            "steps": [
                {
                    "intersections": [
                        {
                            "out": 0,
                            "entry": [
                                true
                            ],
                            "bearings": [
                                78
                            ],
                            "location": [
                                106.660185,
                                10.762561
                            ]
                        }
                    ],
                    "driving_side": "right",
                    "geometry": {
                        "coordinates": [
                            [
                                106.660185,
                                10.762561
                            ],
                            [
                                106.660329,
                                10.762591
                            ]
                        ],
                        "type": "LineString"
                    },
                    "maneuver": {
                        "bearing_after": 78,
                        "bearing_before": 0,
                        "location": [
                            106.660185,
                            10.762561
                        ],
                        "modifier": "left",
                        "type": "depart"
                    },
                    "name": "Hẻm 189 Đường Lý Thường Kiệt",
                    "mode": "driving",
                    "weight": 13.4,
                    "duration": 9.5,
                    "distance": 16.1
                }
            ],
            "weight": 423,
            "summary": "Đường 3 Tháng 2, Cách Mạng Tháng 8",
            "duration": 419.1,
            "distance": 5895.7
        }
    ],
    "weight_name": "routability",
    "geometry": {
        "coordinates": [
            [
                106.660185,
                10.762561
            ],
            [
                106.660329,
                10.762591
            ]
        ],
        "type": "LineString"
    },
    "weight": 423,
    "duration": 419.1,
    "distance": 5895.7
}

    it('should dispatch  findByPickSuccess with results when query is valid', () => {
      

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', {
           a: getRoute({
            start:{lat: 10.762622,
                   lng:  106.660172} ,
            end:{
                   lat: 10.776889,
                   lng:  106.700806

              } }) });

        routeSpy.getRoute.and.returnValue(cold('--e|', { e: mockResponseResultRoute }));
            
  const expectedResults =RouteResult.fromJson(mockResponseResultRoute)
 
        expectObservable(effects.getRoute$).toBe('---b', {
          b:    getRouteSuccess({
                        route: expectedResults,
                      })
        });
      });
    });


    it('should dispatch findByPickFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
       actions = hot('-a', {
           a: getRoute({
            start:{lat: 10.762622,
                   lng:  106.660172} ,
            end:{
                   lat: 10.776889,
                   lng:  106.700806

              } }) });

    routeSpy.getRoute.and.returnValue( cold('--#|', {}, new Error('API error')));
        expectObservable(effects.getRoute$).toBe('---b', {
          b: getRouteFailure({error:'API error'})
        });
      });
    });

  });
});
