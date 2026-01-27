import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'zone.js'
import { viewfullreviewrestaurant } from './viewfullreviewrestaurant';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('viewfullreviewrestaurant', () => {
  let component: viewfullreviewrestaurant;
  let fixture: ComponentFixture<viewfullreviewrestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [viewfullreviewrestaurant],
      providers:[
          provideRouter([]) ,
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

    fixture = TestBed.createComponent(viewfullreviewrestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
