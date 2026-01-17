import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
       providers: [
        provideRouter([]),
      provideMockStore({
  initialState: {
    search: {
      results: [],
      loading: false,
      error: null
    }
  }
}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
