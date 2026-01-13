import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Find } from './find';
import { provideRouter } from '@angular/router';

describe('Find', () => {
  let component: Find;
  let fixture: ComponentFixture<Find>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Find],

       providers: [
        provideRouter([]) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Find);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
