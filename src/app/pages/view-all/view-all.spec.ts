import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAll } from './view-all';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { initialRestaurantWardState } from '../../store/restaurantward/restaurantward.reducer';

describe('ViewAll', () => {
  let component: ViewAll;
  let fixture: ComponentFixture<ViewAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAll],
       providers: [
        provideRouter([]),
                provideMockStore({
          initialState: {
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

    fixture = TestBed.createComponent(ViewAll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
