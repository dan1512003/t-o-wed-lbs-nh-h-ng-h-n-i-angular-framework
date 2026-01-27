import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
       providers:[
          provideRouter([]),
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
user:{
  user: null,
  loading: false,
  phoneResult: [],
  error: null,
}

  }
  
}),

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
