import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Direction } from './direction';
import { provideRouter } from '@angular/router';

describe('Direction', () => {
  let component: Direction;
  let fixture: ComponentFixture<Direction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Direction],
       providers:[
          provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Direction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
