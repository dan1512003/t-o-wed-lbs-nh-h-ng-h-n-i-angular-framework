import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Restaurantdetail } from './restaurantdetail';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('Restaurantdetail', () => {
  let component: Restaurantdetail;
  let fixture: ComponentFixture<Restaurantdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Restaurantdetail],
          providers:[
                provideRouter([]),
                  provideMockStore({
        initialState: {
         
          restaurantSearch: {
  resultsRestaurant: [],
   selectedRestaurant: null,
  loading: false,
  error: null,
},
      user:{
        user: null,
        loading: false,
        phoneResult: [],
        error: null,
      },
      review: {
  reviews: [],
  commands: [],
  starCount: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  address: '',
  reviewUser: null,
  loading: false,
  error: null,
},
      
        }
        
      }),
      
            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restaurantdetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
