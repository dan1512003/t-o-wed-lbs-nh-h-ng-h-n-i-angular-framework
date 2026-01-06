import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Restaurantdetail } from './restaurantdetail';

describe('Restaurantdetail', () => {
  let component: Restaurantdetail;
  let fixture: ComponentFixture<Restaurantdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Restaurantdetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restaurantdetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
