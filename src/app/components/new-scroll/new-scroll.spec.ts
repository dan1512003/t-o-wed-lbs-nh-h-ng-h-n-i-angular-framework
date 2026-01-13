import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScroll } from './new-scroll';

describe('NewScroll', () => {
  let component: NewScroll;
  let fixture: ComponentFixture<NewScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewScroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewScroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
