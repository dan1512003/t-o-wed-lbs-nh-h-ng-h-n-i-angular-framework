import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookinginfo } from './bookinginfo';

describe('Bookinginfo', () => {
  let component: Bookinginfo;
  let fixture: ComponentFixture<Bookinginfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookinginfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookinginfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
