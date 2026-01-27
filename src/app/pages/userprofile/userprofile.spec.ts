import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userprofile } from './userprofile';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

describe('Userprofile', () => {
  let component: Userprofile;
  let fixture: ComponentFixture<Userprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userprofile],
          providers:[
            provideRouter([]),
            provideMockStore({
  initialState: {
user:{
  user: null,
  loading: false,
  phoneResult: [],
  error: null,
}

  }
  
}),

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
