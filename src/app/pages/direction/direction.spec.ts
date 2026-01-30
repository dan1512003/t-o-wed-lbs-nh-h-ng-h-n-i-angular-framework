import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Direction } from './direction';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('Direction', () => {
  let component: Direction;
  let fixture: ComponentFixture<Direction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Direction],
          providers: [
              provideRouter([]) ,
                 provideMockStore({
                initialState: {
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

    fixture = TestBed.createComponent(Direction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
