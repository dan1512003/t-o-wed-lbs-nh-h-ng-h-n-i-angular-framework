import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineScroll } from './cuisine-scroll';
import { provideRouter } from '@angular/router';

describe('CuisineScroll', () => {
  let component: CuisineScroll;
  let fixture: ComponentFixture<CuisineScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuisineScroll],
      providers:[
          provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuisineScroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
