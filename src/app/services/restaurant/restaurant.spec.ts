import { TestBed } from '@angular/core/testing';

import { Restaurant } from './restaurant';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Restaurant', () => {
  let service: Restaurant;
  let httpMock :HttpTestingController;
  const baseUrl = 'http://localhost:3000';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        Restaurant,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(Restaurant);
    httpMock=TestBed.inject(HttpTestingController);
  });
afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


   it('should get restaurant', () => {
    const mockApiResponse ={
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.8434161, 21.0262611]
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
        "coordinates": [105.8488474, 21.0304724]
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
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.8092811, 21.029439]
      },
      "properties": {
        "full_id": "n2175084765",
        "osm_id": "2175084765",
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
        "phone": "+84 243 771 6372",
        "opening_hour": "Mo-Su 08:00-23:00",
        "cuisine": "vietnamese",
        "website": null,
        "addr_street": "Ngõ 575 Kim Mã",
        "name": "Nhà Hàng Highway 4",
        "payment": null,
        "diet": null,
        "starttime": null
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.8535038, 21.0347487]
      },
      "properties": {
        "full_id": "n2256217990",
        "osm_id": "2256217990",
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
        "phone": "+84 94 485 20 09",
        "opening_hour": "Mo-Su 09:00-23:00",
        "cuisine": "asian;international",
        "website": null,
        "addr_street": "Mã Mây",
        "name": "Nhà Hàng Blue Butterfly",
        "payment": null,
        "diet": "vegetarian",
        "starttime": null
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.8090898, 21.0294166]
      },
      "properties": {
        "full_id": "n2399194698",
        "osm_id": "2399194698",
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
        "phone": "+84 243 7247 008",
        "opening_hour":
            "Mo 11:30-14:00,17:30-23:00; Tu-Su 11:30-14:00,17:30-22:00",
        "cuisine": "japanese",
        "website": null,
        "addr_street": "Phố Kim Mã",
        "name": "Izakaya Yancha",
        "payment": null,
        "diet": null,
        "starttime": null
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.8074289, 21.0292029]
      },
      "properties": {
        "full_id": "n2399239575",
        "osm_id": "2399239575",
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
        "phone": "+84 243 766 3776",
        "opening_hour": "Mo-Su 10:00-22:30",
        "cuisine": "japanese",
        "website": null,
        "addr_street": "Phố Kim Mã",
        "name": "Kitaguni",
        "payment": null,
        "diet": null,
        "starttime": null
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.7960898, 21.0178536]
      },
      "properties": {
        "full_id": "n3541565714",
        "osm_id": "3541565714",
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
        "phone": null,
        "opening_hour": "24/7",
        "cuisine": "vietnamese;noodles",
        "website": null,
        "addr_street": null,
        "name": "Phở 24",
        "payment": null,
        "diet": null,
        "starttime": null
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.8932462, 21.0504678]
      },
      "properties": {
        "full_id": "n4090305470",
        "osm_id": "4090305470",
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
        "delivery": "yes",
        "description": null,
        "phone": null,
        "opening_hour": "Mo-Su 10:00-22:00",
        "cuisine": "pizza",
        "website": null,
        "addr_street": "Đường Nguyễn Văn Linh",
        "name": "Pizza Hut",
        "payment": null,
        "diet": null,
        "starttime": null
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.8291428, 21.0625869]
      },
      "properties": {
        "full_id": "n4164895890",
        "osm_id": "4164895890",
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
        "phone": "+84 246 292 1044",
        "opening_hour": "Mo-Su 08:00-24:00",
        "cuisine": "american;burger",
        "website": "https://www.chops.vn/",
        "addr_street": "Phố Quảng An",
        "name": "Chops",
        "payment": null,
        "diet": null,
        "starttime": null
      }
    }
  ]
};
    service.getRestaurant().subscribe((res) => {
      expect(res).toEqual(mockApiResponse);
      expect(res.type).toBe('FeatureCollection');
      expect(res.features.length).toBeGreaterThan(0);
      expect(res.features[0].properties.name)
      .toBe('Quán Ăn Ngon - Phan Bội Châu');
    });

    const req = httpMock.expectOne(`${baseUrl}/api/restaurant`);
    expect(req.request.method).toBe('GET');

    req.flush(mockApiResponse);
  });




 
  it('should get restaurant by osm_id', () => {
    const osmId = 4164895890;
    const mockApiResponse={
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [105.8291428, 21.0625869]
      },
      "properties": {
        "full_id": "n4164895890",
        "osm_id": "4164895890",
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
        "phone": "+84 246 292 1044",
        "opening_hour": "Mo-Su 08:00-24:00",
        "cuisine": "american;burger",
        "website": "https://www.chops.vn/",
        "addr_street": "Phố Quảng An",
        "name": "Chops",
        "payment": null,
        "diet": null,
        "starttime": null
      }
    }
  ]
}
    service.getRestaurantById(osmId).subscribe((res) => {
      expect(res).toEqual(mockApiResponse);
      expect(res.type).toBe('FeatureCollection');
      expect(res.features.length).toBeGreaterThan(0);
      expect(res.features[0].properties.osm_id).toBe("4164895890");
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${baseUrl}/api/restaurantid` &&
        request.params.get('osm_id') === osmId.toString()
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

   it('should get restaurant by ward', () => {
    const osmId = 19331651;
    
    const mockApiResponse ={
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
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8535038,
                    21.0347487
                ]
            },
            "properties": {
                "full_id": "n2256217990",
                "osm_id": "2256217990",
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
                "phone": "+84 94 485 20 09",
                "opening_hour": "Mo-Su 09:00-23:00",
                "cuisine": "asian;international",
                "website": null,
                "addr_street": "Mã Mây",
                "name": "Nhà Hàng Blue Butterfly",
                "payment": null,
                "diet": "vegetarian",
                "starttime": null
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8492754,
                    21.0297478
                ]
            },
            "properties": {
                "full_id": "n4327534896",
                "osm_id": "4327534896",
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
                "phone": null,
                "opening_hour": "Mo-Su 10:00-21:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Phố Lý Quốc Sư",
                "name": "Noodle & Roll",
                "payment": null,
                "diet": "vegetarian",
                "starttime": null
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.849678,
                    21.0290469
                ]
            },
            "properties": {
                "full_id": "n4437567193",
                "osm_id": "4437567193",
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
                "email": "portedannam@didiercorlou.com",
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "+84439382688",
                "opening_hour": "Mo-Su 10:00-22:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Phố Nhà Thờ",
                "name": "Porte D' Annam",
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
                    105.8544931,
                    21.0343571
                ]
            },
            "properties": {
                "full_id": "n4662691589",
                "osm_id": "4662691589",
                "price": null,
                "kids_area": null,
                "baby_feeding": null,
                "self_service": null,
                "website_me": null,
                "image": null,
                "bar": null,
                "indoor": null,
                "contact_in": null,
                "air_conditioning": "yes",
                "outdoor": null,
                "email": null,
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "+84 96 6848389",
                "opening_hour": "08:00-22:00",
                "cuisine": "regional",
                "website": "https://bunchata.com",
                "addr_street": "Phố Nguyễn Hữu Huân",
                "name": "Bún Chả Ta",
                "payment": "cash",
                "diet": "vegetarian",
                "starttime": null
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8474622,
                    21.0337915
                ]
            },
            "properties": {
                "full_id": "n4709634891",
                "osm_id": "4709634891",
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
                "email": "honghoairestaurant@gmail.com",
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "+091 503 35 56",
                "opening_hour": "Mo-Su 10:00-22:00",
                "cuisine": "vietnamese",
                "website": "https://honghoaisrestaurant.com",
                "addr_street": "Phố Bát Đàn",
                "name": "Nhà Hàng Hồng Hoài",
                "payment": null,
                "diet": "vegetarian",
                "starttime": null
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8526198,
                    21.03756
                ]
            },
            "properties": {
                "full_id": "n4713531289",
                "osm_id": "4713531289",
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
                "phone": "01637310386",
                "opening_hour": "Mo-Su 06:00-11:30",
                "cuisine": "fast_food",
                "website": null,
                "addr_street": "Đường Trần Nhật Duật",
                "name": "Ẩm Thực Sành Ăn",
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
                    105.8503828,
                    21.0328009
                ]
            },
            "properties": {
                "full_id": "n4739350321",
                "osm_id": "4739350321",
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
                "contact_fa": "https://www.facebook.com/Lamore.icecream/",
                "delivery": null,
                "description": null,
                "phone": null,
                "opening_hour": "Mo-Su 10:00-23:00",
                "cuisine": "fast_food;coffee_shop;ice_cream",
                "website": null,
                "addr_street": "Lương Văn Can",
                "name": "Nhà Hàng L'amore",
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
                    105.8489788,
                    21.0313543
                ]
            },
            "properties": {
                "full_id": "n4759687343",
                "osm_id": "4759687343",
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
                "email": "Tungskitchen@gmail.com",
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "+84 84 659 9595",
                "opening_hour": "Mo-Su 10:00-22:00",
                "cuisine": "vietnamese",
                "website": "https://tungskitchen.com",
                "addr_street": "Phố Hàng Bông",
                "name": "Tung's Kitchen",
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
                    105.8504582,
                    21.0301366
                ]
            },
            "properties": {
                "full_id": "n4789270528",
                "osm_id": "4789270528",
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
                "phone": "+84437100529",
                "opening_hour": "Mo-Su 09:00-00:00",
                "cuisine": "american",
                "website": null,
                "addr_street": "Bảo Khánh",
                "name": "S&L's Diner",
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
                    105.8474703,
                    21.0305967
                ]
            },
            "properties": {
                "full_id": "n5277149621",
                "osm_id": "5277149621",
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
                "phone": null,
                "opening_hour": "Mo-Su 09:00-23:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": null,
                "name": "Nhà Hàng Mỹ Phồ",
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
                    105.8483461,
                    21.0284211
                ]
            },
            "properties": {
                "full_id": "n5332620122",
                "osm_id": "5332620122",
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
                "phone": null,
                "opening_hour": "Mo-Su 09:00-22:00",
                "cuisine": "vietnamese",
                "website": "http://www.minhchay.com",
                "addr_street": "Phố Ấu Triệu",
                "name": "Nhà Hàng Chay Mihn",
                "payment": null,
                "diet": "vegetarian",
                "starttime": null
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8535259,
                    21.0349168
                ]
            },
            "properties": {
                "full_id": "n6477774987",
                "osm_id": "6477774987",
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
                "email": "matthewmay11@gmail.com",
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "0965610069",
                "opening_hour": "Su-Th 11:30-00:00; Fr-Sa 11:30-01:00",
                "cuisine": "pizza;italian",
                "website": "https://www.nycpizzahanoi.com/",
                "addr_street": "Phố Mã Mây",
                "name": "NYC Pizza",
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
                    105.855273,
                    21.0324152
                ]
            },
            "properties": {
                "full_id": "n6533893985",
                "osm_id": "6533893985",
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
                "phone": "0439352580",
                "opening_hour": "Mo-Su 07:00-23:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Phố Hàng Thùng",
                "name": "Nhac cafe",
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
                    105.8566919,
                    21.0246832
                ]
            },
            "properties": {
                "full_id": "n6924855571",
                "osm_id": "6924855571",
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
                "email": "sen60lythaito@gmail.com",
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "+84 243 974 4192",
                "opening_hour": "Mo 10:00-21:00; Tu-Su 10:00-20:00",
                "cuisine": "buffet",
                "website": null,
                "addr_street": "Phố Lý Thái Tổ",
                "name": "Nhà Hàng Buffet Sen",
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
                    105.8489735,
                    21.0324643
                ]
            },
            "properties": {
                "full_id": "n7025965385",
                "osm_id": "7025965385",
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
                "phone": null,
                "opening_hour": "Mo-Su 10:30-14:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Phố Hàng Quạt",
                "name": "Cửa Hàng Bún Chả Hàng Quạt",
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
                    105.8448225,
                    21.0279649
                ]
            },
            "properties": {
                "full_id": "n7112196485",
                "osm_id": "7112196485",
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
                "email": "rueducamp.pos@gmail.com",
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "096 744 80 88",
                "opening_hour": "Mo-Su 07:00-23:00",
                "cuisine": "vietnamese",
                "website": "https://m.facebook.com/Rueducamp/",
                "addr_street": "Phố Tràng Thi",
                "name": "RueDuCamp Quán cà phê",
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
                    105.8520965,
                    21.0360382
                ]
            },
            "properties": {
                "full_id": "n8631526113",
                "osm_id": "8631526113",
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
                "phone": "+84984836886",
                "opening_hour": "Mo-Su 11:00-14:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Phố Hàng Buồm",
                "name": "Cháo Lòng Phố Cổ",
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
                    105.8444384,
                    21.0291094
                ]
            },
            "properties": {
                "full_id": "n8913119456",
                "osm_id": "8913119456",
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
                "phone": "+84 902 106 946",
                "opening_hour": "Mo-Su 10:00-20:55",
                "cuisine": "european",
                "website": "https://www.savoor.com.vn",
                "addr_street": "Phố Phùng Hưng",
                "name": "Savoor - The House of Panini",
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
                    105.8469059,
                    21.0320556
                ]
            },
            "properties": {
                "full_id": "n11609602708",
                "osm_id": "11609602708",
                "price": null,
                "kids_area": null,
                "baby_feeding": null,
                "self_service": null,
                "website_me": null,
                "image": null,
                "bar": null,
                "indoor": null,
                "contact_in": null,
                "air_conditioning": "no",
                "outdoor": null,
                "email": null,
                "contact_fa": null,
                "delivery": null,
                "description": "specializes in Bánh Xèo",
                "phone": null,
                "opening_hour": "Mo-Fr 11:00-23:00; Sa-Su 11:30-23:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": null,
                "name": "Mr. Bảy Miền Tây",
                "payment": "cash",
                "diet": null,
                "starttime": null
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.856488,
                    21.0303627
                ]
            },
            "properties": {
                "full_id": "n11652527569",
                "osm_id": "11652527569",
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
                "phone": "0988907256",
                "opening_hour": "Mo-Sa 10:00-19:00",
                "cuisine": "vietnamese",
                "website": "https://www.tripadvisor.de/Restaurant_Review-g293924-d24863091-Reviews-Rural_Tonkin_Banh_Mi_Nhe-Hanoi.html",
                "addr_street": "9 Hang Voi St. (2nd Floor)",
                "name": "BANH Mi NHE",
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
                    105.848015,
                    21.0292381
                ]
            },
            "properties": {
                "full_id": "n11675163969",
                "osm_id": "11675163969",
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
                "phone": null,
                "opening_hour": "Mo-Su 06:30-23:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Ngõ Huyện",
                "name": "Xôi Tiến",
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
                    105.8475526,
                    21.0365868
                ]
            },
            "properties": {
                "full_id": "n11683507069",
                "osm_id": "11683507069",
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
                "phone": null,
                "opening_hour": "Mo-Su 04:30-22:30",
                "cuisine": "vietnamese;noodles",
                "website": null,
                "addr_street": "Phố Hàng Mã",
                "name": "Phở Tư lùn",
                "payment": null,
                "diet": "",
                "starttime": null
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.847612,
                    21.0324629
                ]
            },
            "properties": {
                "full_id": "n11878372469",
                "osm_id": "11878372469",
                "price": null,
                "kids_area": null,
                "baby_feeding": null,
                "self_service": "no",
                "website_me": null,
                "image": null,
                "bar": null,
                "indoor": null,
                "contact_in": null,
                "air_conditioning": null,
                "outdoor": null,
                "email": "greeninn41hangnon@gmail.com",
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "0963389571",
                "opening_hour": "Mo-Su 09:00-22:00",
                "cuisine": "asian;vietnamese",
                "website": "https://greeninn.vn/",
                "addr_street": null,
                "name": "Green Inn",
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
                    105.8535075,
                    21.0340257
                ]
            },
            "properties": {
                "full_id": "n12063757631",
                "osm_id": "12063757631",
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
                "phone": "+84866730986",
                "opening_hour": "Mo-Su 08:00-22:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Phố Mã Mây",
                "name": "May de Cuisine",
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
                    105.8468214,
                    21.0323897
                ]
            },
            "properties": {
                "full_id": "n12692463221",
                "osm_id": "12692463221",
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
                "outdoor": "yes",
                "email": null,
                "contact_fa": null,
                "delivery": "yes",
                "description": null,
                "phone": null,
                "opening_hour": "Mo-Su 07:00-14:00,16:30-20:30",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Phố Hàng Điếu",
                "name": "Chay Tâm Khối",
                "payment": null,
                "diet": "vegetarian",
                "starttime": null
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8441279,
                    21.0297293
                ]
            },
            "properties": {
                "full_id": "n10179892274",
                "osm_id": "10179892274",
                "price": null,
                "kids_area": null,
                "baby_feeding": null,
                "self_service": null,
                "website_me": null,
                "image": "https://theeast.vn/dinning/gallery/",
                "bar": null,
                "indoor": null,
                "contact_in": null,
                "air_conditioning": "yes",
                "outdoor": null,
                "email": null,
                "contact_fa": null,
                "delivery": null,
                "description": null,
                "phone": "+84963733797",
                "opening_hour": "Mo-Su 10:00-22:00",
                "cuisine": "vietnamese;international;european",
                "website": "https://theeast.vn/",
                "addr_street": "Phố Tống Duy Tân",
                "name": "The East",
                "payment": "cash",
                "diet": "vegetarian;heathy",
                "starttime": "15/12/2025"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8577493,
                    21.0254125
                ]
            },
            "properties": {
                "full_id": "n3671198536",
                "osm_id": "3671198536",
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
                "phone": null,
                "opening_hour": "Mo-Su  7:30-00:00",
                "cuisine": "japanese",
                "website": null,
                "addr_street": "Lý Đạo Thành",
                "name": "Nhà Hàng Moto-san",
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
                    105.8483343,
                    21.0292058
                ]
            },
            "properties": {
                "full_id": "n6425005085",
                "osm_id": "6425005085",
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
                "phone": null,
                "opening_hour": "Mo-Su 6:00-14:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Thọ Xương",
                "name": "Bún Riêu Cua Thu",
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
                    105.8493056,
                    21.0313423
                ]
            },
            "properties": {
                "full_id": "n10298555575",
                "osm_id": "10298555575",
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
                "phone": null,
                "opening_hour": "Mo-Su 15:00 - 20:00",
                "cuisine": "noodles;vietnamese",
                "website": null,
                "addr_street": "Phố Hàng Trống",
                "name": "Phở bưng Hàng Trống",
                "payment": null,
                "diet": null,
                "starttime": "15/12/2025"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8497103,
                    21.0303507
                ]
            },
            "properties": {
                "full_id": "n11371361970",
                "osm_id": "11371361970",
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
                "contact_fa": "100088242072717",
                "delivery": null,
                "description": null,
                "phone": "+84 378 233 113",
                "opening_hour": "Mo-Sa 09:30-21:00; Su 09:00-18:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Phố Hàng Trống",
                "name": "Bánh mì chay Vegan",
                "payment": null,
                "diet": "vegetarian",
                "starttime": "15/12/2025"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    105.8489505,
                    21.0302188
                ]
            },
            "properties": {
                "full_id": "n11371431369",
                "osm_id": "11371431369",
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
                "phone": "+84 942 855 388",
                "opening_hour": "Mo-Su 08:00-00:00",
                "cuisine": "vietnamese",
                "website": null,
                "addr_street": "Phố Lý Quốc Sư",
                "name": "Quán Little Hà Nội",
                "payment": null,
                "diet": "vegetarian",
                "starttime": "15/12/2025"
            }
        }
    ]
}
    service.getRestaurantByIdWard(osmId).subscribe((res) => {
      expect(res).toEqual(mockApiResponse);
      expect(res.type).toBe('FeatureCollection');
      expect(res.features[0].geometry.type).toBe("Point");
      expect(res.features.length).toBeGreaterThan(0);
      expect(res.features[0].properties.name).toBe("Pho 10");
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${baseUrl}/api/restaurant` &&
        request.params.get('osm_id') === osmId.toString()
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });
});
