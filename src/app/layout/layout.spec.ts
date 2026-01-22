import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';
import { signal } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [Layout],
      providers:[
             provideMockStore({
          initialState: {
            search: {
              results: [],
              loading: false,
              error: null
            },
              restaurantWard: {
      restaurantward: { data: [], loading: false, error: null },
      restaurantAvail: { data: [], loading: false, error: null },
      restaurantHighRate: { data: [], loading: false, error: null },
      restaurantNew: { data: [], loading: false, error: null },
      cuisine: { data: [], loading: false, error: null },
      restaurantCusine: { data: [], loading: false, error: null }
    },
          }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update keyword signal when child emits keywordChange', () => {
    const child = {
      keyword: signal(''),
      keywordChange: {
        subscribe: (fn: (v: string) => void) => fn('angular'),
      },
    };

    component.onActivate(child);

    expect(component.keyword()).toBe('angular');
  });

  it('should update isSticky when child emits stickyChange', () => {
    const child = {
      stickyChange: {
        subscribe: (fn: (v: boolean) => void) => fn(true),
      },
    };

    component.onActivate(child);

    expect(component.isSticky()).toBe(true);
  });
});
