import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownScroll } from './town-scroll';
import { provideRouter } from '@angular/router';

describe('TownScroll', () => {
  let component: TownScroll;
  let fixture: ComponentFixture<TownScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TownScroll],
       providers:[
          provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TownScroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
