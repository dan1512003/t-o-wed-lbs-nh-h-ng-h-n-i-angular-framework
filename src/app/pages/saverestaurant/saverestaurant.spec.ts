import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Saverestaurant } from './saverestaurant';

describe('Saverestaurant', () => {
  let component: Saverestaurant;
  let fixture: ComponentFixture<Saverestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Saverestaurant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Saverestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
