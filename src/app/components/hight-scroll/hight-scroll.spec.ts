import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HightScroll } from './hight-scroll';

describe('HightScroll', () => {
  let component: HightScroll;
  let fixture: ComponentFixture<HightScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HightScroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HightScroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
