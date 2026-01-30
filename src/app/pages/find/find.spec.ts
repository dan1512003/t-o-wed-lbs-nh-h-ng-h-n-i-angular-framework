import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Find } from './find';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('Find', () => {
  let component: Find;
  let fixture: ComponentFixture<Find>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Find],

       providers: [
        provideRouter([]) ,
           provideMockStore({
          initialState: {
            search: {
              results: [],
              loading: false,
              error: null
            },
           restaurantSearch:{
                resultsRestaurant:[],
                loading: false,
                error:  null,
            },
             searchMap: {
  results: [],
  resultRestaurant: null,
  routeResult: null,
  loading: false,
  error: null,
},
                 geolocation:{
  permissionGranted: false,
  currentLocation: null,
  loading: false,
  error: null,
}
          }
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Find);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
