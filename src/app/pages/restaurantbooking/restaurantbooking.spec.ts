import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'zone.js'
import { Restaurantbooking } from './restaurantbooking';

describe('Restaurantbooking', () => {
  let component: Restaurantbooking;
  let fixture: ComponentFixture<Restaurantbooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Restaurantbooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restaurantbooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
