import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestScheduler } from 'rxjs/testing';
import { Restaurant } from '../../services/restaurant/restaurant';
import { Ward } from '../../services/ward/ward';
import { Action } from '@ngrx/store';
import { isDateInCurrentMonth, RestaurantWardEffects } from './restaurantward.effects';
import { Review } from '../../services/review/review';
import { Diet } from '../../services/diet/diet';
import { loadCuisine, loadCuisineFailure, loadCuisineSuccess, loadRestaurantAvail, loadRestaurantAvailFailure, loadRestaurantAvailSuccess, loadRestaurantByWard, loadRestaurantByWardFailure, loadRestaurantByWardSuccess, loadRestaurantCuisine, loadRestaurantCuisineFailure, loadRestaurantCuisineSuccess, loadRestaurantHighRate, loadRestaurantHighRateFailure, loadRestaurantHighRateSuccess, loadRestaurantNew, loadRestaurantNewFailure, loadRestaurantNewSuccess } from './restaurantward.actions';
import { WardModel } from '../../model/ward/ward.model';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { ReviewModel } from '../../model/review/review.model';
import { DietModel } from '../../model/diet/diet.model';



describe('ShowsEffects', () => {

  let effects: RestaurantWardEffects;
 let actions = new Observable<Action>();
  const restaurantSpy = jasmine.createSpyObj('Restaurant',
   ['getRestaurant',
    'getRestaurantByIdWard',
    'getRestaurantById',
    'getRestaurantBound'
 
  ]);
  const wardSpy = jasmine.createSpyObj('Ward', ['getWard',   'getWardByLatLon']);
  const reviewSpy =jasmine.createSpyObj('Review',['getReview'])
  const dietSpy =jasmine.createSpyObj('Diet',['getDiet'])
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
       RestaurantWardEffects,
        provideMockActions(() => actions),
            { provide: Diet, useValue: dietSpy },
            { provide: Restaurant, useValue: restaurantSpy },
            { provide: Ward, useValue: wardSpy },
            {provide:Review,useValue:reviewSpy},
      ]
    });

    effects = TestBed.inject(RestaurantWardEffects);


    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  //test loadRestaurantByWard
describe('loadRestaurantByWard$', () => {
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
    it('should dispatch loadRestaurantByWardSuccess  with results when query is valid', () => {

   
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: loadRestaurantByWard() });

    
        const restaurantByIdWardResponse = cold('--y|', { y: mockApiByIdWardResponse });
        const wardResponse = cold('--z|', { z: mockWardResponse });

      
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
        wardSpy.getWard.and.returnValue(wardResponse);

      // Build expectedResults
    const expectedResults = mockWardResponse.features.map(f => ({
      ward: WardModel.fromMap(f.properties),
      count: mockApiByIdWardResponse.features.length 
    }));
     
        expectObservable(effects.loadRestaurantByWard$).toBe('------b', {
         b: loadRestaurantByWardSuccess({ data: expectedResults })
        });
      });
    });

    it('should dispatch loadRestaurantByWardFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
         actions = hot('-a', { a: loadRestaurantByWard() });


       
        const restaurantByIdWardResponse = cold('--y|', { y: mockApiByIdWardResponse });
        const wardResponse =  cold('--#|', {}, new Error('API error'));
         restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
         wardSpy.getWard.and.returnValue(wardResponse);

        expectObservable(effects.loadRestaurantByWard$).toBe('---b', {
          b: loadRestaurantByWardFailure({ error: 'API error' })
        });
      });
    });

  });
//test restaurantAvail Effect 
describe('restaurantAvail$', () => {
   const fixedTime = new Date(2025, 0, 1, 12, 0, 0).getTime();

  beforeEach(() => {
    spyOn(Date, 'now').and.returnValue(fixedTime);
  });

  afterEach(() => {
    (Date.now as jasmine.Spy).and.callThrough();
  });

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
                "opening_hour": "24/7",
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

 const mockReviewResponse = [
    {
      id: 1,
      ratefood: 3,
      rateservice: 3,
      rateambience: 3,
      overallrating: 3,
      command: 'good',
      id_restaurant: '773601261',
      email: 'test@example.com',
      date: '01/12/2025 15:30:45',
      like: null,
    },
   
  ];
    it('should dispatch loadRestaurantAvailSuccess with results when query is valid', () => {

   
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: loadRestaurantAvail({osmId:"773601261"}) });

    
        const restaurantByIdWardResponse = cold('--y|', { y: mockApiByIdWardResponse });
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

     const featuresRestaurant: any[] = mockApiByIdWardResponse['features'];
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
 
     
        expectObservable(effects.restaurantAvail$).toBe('-----b', {
         b: loadRestaurantAvailSuccess({ data: expectedResults })
        });
      });
    });

    it('should dispatch loadRestaurantAvailFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
         actions = hot('-a', {  a: loadRestaurantAvail({osmId:""}) });


      

           const restaurantByIdWardResponse = cold('--#|', {}, new Error('API error'));
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

        expectObservable(effects.restaurantAvail$).toBe('---b', {
          b: loadRestaurantAvailFailure({ error: 'API error' })
        });
      });
    });

  });

  //test effect restaurant cuisine

  describe('restaurantCuisine$', () => {
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

   const mockDietList =[
    {
        "id": 1,
        "diet": "vietnamese",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSizTMOjDQBeDuaL3spDV01JRwjnCzm9wW3Ag&s"
    },
    {
        "id": 2,
        "diet": "asian",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLL9kpq2FIopxXxLuKR3eVY8V-PKOxkn2-A&s"
    },
    {
        "id": 3,
        "diet": "international",
        "image": "https://cdn-ijnhp.nitrocdn.com/pywIAllcUPgoWDXtkiXtBgvTOSromKIg/assets/images/optimized/rev-5794eaa/www.jaypeehotels.com/blog/wp-content/uploads/2020/09/chinese-1.jpg"
    },
    {
        "id": 4,
        "diet": "pizza",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9bV18R5_34GH7dRVh4MkpFU1mVEx33tOfA&s"
    },
    {
        "id": 5,
        "diet": "japanese",
        "image": "https://nakatojapanesesteakhouse.com/wp-content/uploads/2024/08/Nakto-Cover-Photo.jpg"
    },
    {
        "id": 6,
        "diet": "noodles",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa1ZdKzx5X3lyop9Nk79ZqTRN85Ic6uVvctA&s"
    },
    {
        "id": 7,
        "diet": "hotpot",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHBad_f-qvM9LJan0zzMHVpKU8UJmFQBZWBQ&s"
    },
    {
        "id": 8,
        "diet": "regional",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_26NFN793LXBqiFa_mkRazfvNqJi3kClNw&s"
    },
    {
        "id": 9,
        "diet": "american",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJVej_MpOskwsn2_w0g0SohHBWjUqfz4blMA&s"
    },
    {
        "id": 10,
        "diet": "burger",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-7PKDrvRWHkOR6_aMj5YzHn4OzfwS4D3Veg&s"
    },
    {
        "id": 11,
        "diet": "korean",
        "image": "https://ik.imagekit.io/tvlk/blog/2024/07/Kimchi-Korean-Traditional-Food-1024x576.jpg?tr=q-70,c-at_max,w-1000,h-600"
    },
    {
        "id": 12,
        "diet": "steak_house",
        "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/6c/13/1a/black-rock-steaks-rib.jpg?w=800&h=500&s=1"
    },
    {
        "id": 13,
        "diet": "fish",
        "image": "https://thewoksoflife.com/wp-content/uploads/2025/11/kaoyu-recipe-15.jpg"
    },
    {
        "id": 14,
        "diet": "indian",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyK7iVD1XjH5Ko4C4KHHCkyOy4FGmVT-m29w&s"
    },
    {
        "id": 15,
        "diet": "fast_food",
        "image": "https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?semt=ais_hybrid&w=740&q=80"
    },
    {
        "id": 16,
        "diet": "coffee_shop",
        "image": "https://www.luxcafeclub.com/cdn/shop/articles/Italian_Food_Pairings_Coffee_1100x.png?v=1714586900"
    },
    {
        "id": 17,
        "diet": "ice_cream",
        "image": "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg"
    },
    {
        "id": 18,
        "diet": "french",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa0hQHFuOE1Yw5thSJJ99ci_gpvNPm73_Siw&s"
    },
    {
        "id": 19,
        "diet": "grill",
        "image": "https://www.foodandwine.com/thmb/MO-hoMJlE9A69ZF6a6haP79NG34=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Use-Your-Grill-to-Meal-Plan-FT-BLOG0723-6c2eebaaed8d419ba6864013bd8ffdfa.jpg"
    },
    {
        "id": 20,
        "diet": "barbecue",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYwFMerbTMmnAh3a7B4yDJPNaoUdN4kGJ_FA&s"
    },
    {
        "id": 21,
        "diet": "buffet",
        "image": "https://www.shutterstock.com/image-photo/cuisine-culinary-buffet-dinner-catering-260nw-1191247123.jpg"
    },
    {
        "id": 22,
        "diet": "italian",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgIcNvulwh_SdH_vSLCJQAD2TJPeNSsOY2Ew&s"
    },
    {
        "id": 23,
        "diet": "seafood",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr9rZfm7h0nXkG0LNxett3ygvH0WAuzCbR4Q&s"
    },
    {
        "id": 24,
        "diet": "dessert",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJvXXehnAeh_qzrrOLMrq1eqkwL2cSNjh9A&s"
    },
    {
        "id": 25,
        "diet": "sushi",
        "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/5f/89/9e/sushi-set.jpg?w=900&h=500&s=1"
    },
    {
        "id": 26,
        "diet": "salad",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuGaoy634PfNv0B010m7jdX5Pgrdaybnp_0A&s"
    },
    {
        "id": 27,
        "diet": "diner",
        "image": "https://eddiesdiner.vn/wp-content/uploads/2024/07/Eddie_s-29-1.jpg"
    },
    {
        "id": 28,
        "diet": "chicken",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1PwR5GGwcU6sBzFYso_XaewWXt1NnyPcUg&s"
    },
    {
        "id": 29,
        "diet": "sandwich",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2OKGj_nx7fdBExx9BGJgjO29uAEotwN-SA&s"
    },
    {
        "id": 30,
        "diet": "russian",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9g6OnnEYnkRWiweldC5VnomlgLo_rFf6uNA&s"
    },
    {
        "id": 31,
        "diet": "hot_dog",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrISy2ihJ91HLCtjB-cjPTJSPSgHMB2V9NrA&s"
    },
    {
        "id": 32,
        "diet": "tea",
        "image": "https://www.rippletea.com/cdn/shop/files/freepik__flat-lay-image-showing-cups-of-different-teas-oolo__91644.jpg?v=1748921500&width=360"
    },
    {
        "id": 33,
        "diet": "pancake",
        "image": "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/fluffyamericanpancak_74828_16x9.jpg"
    },
    {
        "id": 34,
        "diet": "european",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNFJkwsU4vQLjBX9LfhNJy3Wcos__EaEHVg&s"
    },
    {
        "id": 35,
        "diet": "thai",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYQwpcpoERLikvOsB8XVAcsUNxTOPMgXm-lg&s"
    },
    {
        "id": 36,
        "diet": "german",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4St1hNqdZyiQ2_actXL25nPNnif8NO7Gbig&s"
    },
    {
        "id": 37,
        "diet": "turkish",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJEgqinWvuqoYk51B7_szkhulOtes3hmZtAA&s"
    },
    {
        "id": 38,
        "diet": "chinese",
        "image": "https://static.wixstatic.com/media/e1af2b_9ec7c4c0196c4fde9a8fcb859b65ad13~mv2.jpg/v1/fill/w_568,h_378,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/e1af2b_9ec7c4c0196c4fde9a8fcb859b65ad13~mv2.jpg"
    }
]; 
    it('should dispatch loadCuisineSuccess  with results when query is valid', () => {

   
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: loadCuisine({osmId:""}) });

       dietSpy.getDiet.and.returnValue(cold('--e|', { e: mockDietList}));
        const restaurantByIdWardResponse = cold('--y|', { y: mockApiByIdWardResponse });
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
        

  
    const expectedCuisine = mockDietList
        .map(d => DietModel.fromJson(d))
        .map(d => {

          if (d.diet.toLowerCase() === 'vietnamese') {
            d.count = 1;
          }
          return d;
        })
        .filter(d => d.count > 0);
 
     
        expectObservable(effects.restaurantCuisine$).toBe('-----b', {
         b: loadCuisineSuccess({ data:expectedCuisine})
        });
      });
    });

    it('should dispatch loadCuisineFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
         actions = hot('-a', { a: loadCuisine({osmId:""})  });

           dietSpy.getDiet.and.returnValue(cold('--#|', {}, new Error('API error')));
           const restaurantByIdWardResponse = cold('--y|', { y: mockApiByIdWardResponse });
            restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
        

        expectObservable(effects.restaurantCuisine$).toBe('---b', {
          b:loadCuisineFailure({ error: 'API error' })
        });
      });
    });

  });

  //test effect restaurant hightrate
  describe('restaurantHighRate$', () => {
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

 const mockReviewResponse = [
    {
      id: 1,
      ratefood: 3,
      rateservice: 3,
      rateambience: 3,
      overallrating: 3,
      command: 'good',
      id_restaurant: '773601261',
      email: 'test@example.com',
      date: '01/12/2025 15:30:45',
      like: null,
    },
   
  ];
    it('should dispatch loadRestaurantHighRateSuccess with results when query is valid', () => {

   
        testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: loadRestaurantHighRate({osmId:""}) });

        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));
        const restaurantByIdWardResponse = cold('--y|', { y: mockApiByIdWardResponse });
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
      
 
      const featureList: any[] = mockApiByIdWardResponse.features;
      const restaurants: RestaurantModel[] = featureList.map(f =>
        RestaurantModel.fromFeature(f)
      );
      
      const reviewsList: ReviewModel[] = mockReviewResponse.map(r =>
        ReviewModel.fromJson(r)
      );

      const restaurantListMap = new Map<string, RestaurantModel>();
      restaurants.forEach(r => restaurantListMap.set(r.osmId, r));

      reviewsList.forEach(r => {
        const res = restaurantListMap.get(r.idRestaurant);
        if (res) {
          res.overallRating += r.overallrating ?? 0;
          res.reviewCount += 1;
        }
      });

     
      let highRate = Array.from(restaurantListMap.values())
        .filter(r => {
          if (r.reviewCount === 0) return false;
          r.overallRating = r.overallRating / r.reviewCount;
          return r.overallRating > 2;
        })
        .sort((a, b) => b.overallRating - a.overallRating)
        .slice(0, 10);

      highRate.forEach(r => {
        r.overallRating = 0;
        r.reviewCount = 0;
      });

 



           const reviews: ReviewModel[] =
           mockReviewResponse.map(d => ReviewModel.fromJson(d));
           const restaurantMap = new Map<string, RestaurantModel>();
           highRate.forEach(r => {
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
 
     
        expectObservable(effects.restaurantHighRate$).toBe('-------b', {
         b: loadRestaurantHighRateSuccess({ data: expectedResults })
        });
      });
    });

    it('should dispatch loadRestaurantAvailFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
         actions = hot('-a', {  a: loadRestaurantHighRate({osmId:""}) });


        reviewSpy.getReview.and.returnValue(cold('--#|', {}, new Error('API error')));
        const restaurantByIdWardResponse = cold('--y|', { y: mockApiByIdWardResponse });
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);

        

        expectObservable(effects.restaurantHighRate$).toBe('---b', {
          b: loadRestaurantHighRateFailure({ error: 'API error' })
        });
      });
    });

  });
//test  effect restaurant new
describe('restaurantNew$', () => {
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

 const mockReviewResponse = [
    {
      id: 1,
      ratefood: 3,
      rateservice: 3,
      rateambience: 3,
      overallrating: 3,
      command: 'good',
      id_restaurant: '773601261',
      email: 'test@example.com',
      date: '01/12/2025 15:30:45',
      like: null,
    },
   
  ];
    it('should dispatch loadRestaurantNewSuccess with results when query is valid', () => {

   
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: loadRestaurantNew({osmId:""}) });

    
        const restaurantByIdWardResponse = cold('--y|', { y: mockApiByIdWardResponse });
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

     const featuresRestaurant: any[] = mockApiByIdWardResponse['features'];
        const resultsRestaurant= featuresRestaurant.map(f => RestaurantModel.fromFeature(f))
         .filter(
                        (r: RestaurantModel) =>
                          r.starttime && isDateInCurrentMonth(r.starttime)
                      );
        ;
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
 
     
        expectObservable(effects.restaurantNew$).toBe('-----b', {
         b:loadRestaurantNewSuccess({ data: expectedResults })
        });
      });
    });

    it('should dispatch loadRestaurantNewFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
         actions = hot('-a', {  a: loadRestaurantNew({osmId:""}) });


      

           const restaurantByIdWardResponse = cold('--#|', {}, new Error('API error'));
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

        expectObservable(effects.restaurantNew$).toBe('---b', {
          b: loadRestaurantNewFailure({ error: 'API error' })
        });
      });
    });

  });
//test effect restaurant cuisine
  describe('loadRestaurantCuisine$', () => {
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
                "cuisine": "vietnamese;pizza",
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

 const mockReviewResponse = [
    {
      id: 1,
      ratefood: 3,
      rateservice: 3,
      rateambience: 3,
      overallrating: 3,
      command: 'good',
      id_restaurant: '773601261',
      email: 'test@example.com',
      date: '01/12/2025 15:30:45',
      like: null,
    },
   
  ];

const cuisine:string="vietnamese";
    it('should dispatch loadRestaurantCuisineSuccess with results when query is valid', () => {

   
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: loadRestaurantCuisine({osmId:"",cuisine:cuisine}) });

    
        const restaurantByIdWardResponse = cold('--y|', { y: mockApiByIdWardResponse });
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

     const featuresRestaurant: any[] = mockApiByIdWardResponse['features'];
        const resultsRestaurant= featuresRestaurant.map(f => RestaurantModel.fromFeature(f)).filter((r: RestaurantModel) => {
                if (!r.cuisine) return false;
                return r.cuisine
                  .split(';')
                  .map(s => s.trim())
                  .includes(cuisine);
              });
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
 
     
        expectObservable(effects.loadRestaurantCuisine$).toBe('-----b', {
         b: loadRestaurantCuisineSuccess({ data: expectedResults })
        });
      });
    });

    it('should dispatch loadRestaurantCuisineFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
         actions = hot('-a', {  a: loadRestaurantCuisine({osmId:"",cuisine:cuisine}) });


      

        const restaurantByIdWardResponse = cold('--#|', {}, new Error('API error'));
        restaurantSpy.getRestaurantByIdWard.and.returnValue(restaurantByIdWardResponse);
        reviewSpy.getReview.and.returnValue(cold('--e|', { e: mockReviewResponse }));

        expectObservable(effects.loadRestaurantCuisine$).toBe('---b', {
          b: loadRestaurantCuisineFailure({ error: 'API error' })
        });
      });
    });

  });
});


