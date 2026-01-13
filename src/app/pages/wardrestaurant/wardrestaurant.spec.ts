import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wardrestaurant } from './wardrestaurant';
import { provideRouter } from '@angular/router';

describe('Wardrestaurant', () => {
  let component: Wardrestaurant;
  let fixture: ComponentFixture<Wardrestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wardrestaurant],
       providers: [
        provideRouter([]) 
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
