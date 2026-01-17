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
