import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wardrestaurant } from './wardrestaurant';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { WardRestaurantCount } from '../../store/restaurantward/restaurantward.actions';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { initialAsyncState, initialRestaurantWardState } from '../../store/restaurantward/restaurantward.reducer';

describe('Wardrestaurant', () => {
  let component: Wardrestaurant;
  let fixture: ComponentFixture<Wardrestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wardrestaurant],
       providers: [
        provideRouter([]) ,
        provideMockStore({
  initialState: {
     search: {
              results: [],
              loading: false,
              error: null
            },
   restaurantWard: {
      restaurantward: { data: [], loading: false, error: null },
      restaurantAvail: { data: [], loading: false, error: null },
      restaurantHighRate: { data: [], loading: false, error: null },
      restaurantNew: { data: [], loading: false, error: null },
      cuisine: { data: [], loading: false, error: null },
      restaurantCusine: { data: [], loading: false, error: null }
    },
  }
})

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wardrestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
