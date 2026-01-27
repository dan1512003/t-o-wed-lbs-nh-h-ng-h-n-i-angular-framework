import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accountdetail } from './accountdetail';
import { provideMockStore } from '@ngrx/store/testing';

describe('Accountdetail', () => {
  let component: Accountdetail;
  let fixture: ComponentFixture<Accountdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accountdetail],
        providers:[
             
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

    fixture = TestBed.createComponent(Accountdetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
