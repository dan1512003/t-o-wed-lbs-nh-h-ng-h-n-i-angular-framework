import { TestBed } from '@angular/core/testing';

import { Diet } from './diet';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Diet', () => {
  let service: Diet;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        Diet,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(Diet);
    httpMock =TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
   it('should return the diet list', () => {

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
    service.getDiet().subscribe((res) => {
      expect(res.length).toBeGreaterThan(0);
      expect(res[0].diet).toBe('vietnamese');
    });

    // Fake request
    const req = httpMock.expectOne(`${baseUrl}/api/diet`);
    expect(req.request.method).toBe('GET');

    // flush fake data
    req.flush(mockDietList);
  });
});
