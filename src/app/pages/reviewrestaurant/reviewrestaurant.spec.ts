import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reviewrestaurant } from './reviewrestaurant';

describe('Reviewrestaurant', () => {
  let component: Reviewrestaurant;
  let fixture: ComponentFixture<Reviewrestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reviewrestaurant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reviewrestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
