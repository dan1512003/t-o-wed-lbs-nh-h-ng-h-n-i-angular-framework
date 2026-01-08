import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';


import { TestScheduler } from 'rxjs/testing';

import { Place } from '../../services/place/place';
import { Restaurant } from '../../services/restaurant/restaurant';
import { Ward } from '../../services/ward/ward';
import { SearchEffects } from './search.effects';
import { search, searchFailure, searchSuccess } from './search.actions';
import { Action } from '@ngrx/store';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';



describe('ShowsEffects', () => {

  let effects: SearchEffects;
 let actions = new Observable<Action>();
  const placeSpy = jasmine.createSpyObj('Place', ['searchPlace']);
  const restaurantSpy = jasmine.createSpyObj('Restaurant', ['getRestaurant']);
  const wardSpy = jasmine.createSpyObj('Ward', ['getWard']);
  let testScheduler: TestScheduler;
 const mockSearchResponse = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          osm_id: '10103088449',
          category: 'amenity',
          type: 'restaurant',
          name: 'Tokachiya Ramen',
          display_name: 'Tokachiya Ramen, 647B, Phố Kim Mã, Hà Nội'
        },
        geometry: { type: 'Point', coordinates: [105.8069828, 21.0291169] }
      }
    ]
  };

  const mockApiResponse = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [105.8434161, 21.0262611] },
        properties: { osm_id: '10103088449', name: 'Quán Ăn Ngon' }
      }
    ]
  };

  const mockWardResponse = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'MultiPolygon', coordinates: [] },
        properties: { osm_id: '19338089', name: 'Xã Trung Giã' }
      }
    ]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchEffects,
        provideMockActions(() => actions),
        { provide: Place, useValue: placeSpy },
        { provide: Restaurant, useValue: restaurantSpy },
        { provide: Ward, useValue: wardSpy },
      ]
    });

    effects = TestBed.inject(SearchEffects);


    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
describe('search$', () => {

    it('should dispatch searchSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: search({ query: 'restaurant' }) });

        const placeResponse = cold('--x|', { x: mockSearchResponse });
        const restaurantResponse = cold('--y|', { y: mockApiResponse });
        const wardResponse = cold('--z|', { z: mockWardResponse });

        placeSpy.searchPlace.and.returnValue(placeResponse);
        restaurantSpy.getRestaurant.and.returnValue(restaurantResponse);
        wardSpy.getWard.and.returnValue(wardResponse);

        const expectedResults = [
          NominatimPlace.fromJson(mockSearchResponse.features[0])
        ];

        expectObservable(effects.search$).toBe('----b', {
          b: searchSuccess({ results: expectedResults })
        });
      });
    });

    it('should dispatch searchSuccess with empty array when query is empty', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions = hot('-a', { a: search({ query: '   ' }) });
        expectObservable(effects.search$).toBe('-b', {
          b: searchSuccess({ results: [] })
        });
      });
    });
    it('should dispatch searchFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: search({ query: 'restaurant' }) });

       
        const placeResponse = cold('--#|', {}, new Error('API error'));
        const restaurantResponse = cold('--y|', { y: mockApiResponse });
        const wardResponse = cold('--z|', { z: mockWardResponse });

        placeSpy.searchPlace.and.returnValue(placeResponse);
        restaurantSpy.getRestaurant.and.returnValue(restaurantResponse);
        wardSpy.getWard.and.returnValue(wardResponse);

        expectObservable(effects.search$).toBe('---b', {
          b: searchFailure({ error: new Error('API error') })
        });
      });
    });

  });

});
