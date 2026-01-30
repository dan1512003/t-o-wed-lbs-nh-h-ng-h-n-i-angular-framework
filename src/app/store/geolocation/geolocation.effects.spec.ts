import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestScheduler } from 'rxjs/testing';

import { GeolocationEffects } from './geolocation.effects';
import {
  requestLocationPermission,
  locationPermissionGranted,
  locationPermissionDenied,
  getCurrentLocation,
  getCurrentLocationSuccess,
  getCurrentLocationFailure
} from './geolocation.action';

describe('GeolocationEffects', () => {
  let actions$: Observable<Action>;
  let effects: GeolocationEffects;
  let testScheduler: TestScheduler;


  let geolocationSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeolocationEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(GeolocationEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

   
    geolocationSpy = spyOn(
      navigator.geolocation,
      'getCurrentPosition'
    );
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  // ============================
  // requestPermission$
  // ============================
  describe('requestPermission$', () => {
    it('should dispatch locationPermissionGranted when permission granted', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: requestLocationPermission(),
        });

        geolocationSpy.and.callFake((success) => {
          success({} as GeolocationPosition);
        });

        expectObservable(effects.requestPermission$).toBe('-b', {
          b: locationPermissionGranted(),
        });
      });
    });

    it('should dispatch locationPermissionDenied when permission denied', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: requestLocationPermission(),
        });

        geolocationSpy.and.callFake((_success, error) => {
          error({} as GeolocationPositionError);
        });

        expectObservable(effects.requestPermission$).toBe('-b', {
          b: locationPermissionDenied(),
        });
      });
    });

    it('should dispatch locationPermissionDenied when geolocation not supported', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        spyOnProperty(navigator, 'geolocation', 'get').and.returnValue(undefined as any);

        actions$ = hot('-a', {
          a: requestLocationPermission(),
        });

        expectObservable(effects.requestPermission$).toBe('-b', {
          b: locationPermissionDenied(),
        });
      });
    });
  });

  // getcurrentlocation
  describe('getCurrentLocation$', () => {
    it('should dispatch getCurrentLocationSuccess when location fetched', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: getCurrentLocation(),
        });

       geolocationSpy.and.callFake((success) => {
  success({
    coords: {
      latitude: 10.762622,
      longitude: 106.660172,
    },
  } as GeolocationPosition);
});


        expectObservable(effects.getCurrentLocation$).toBe('-b', {
          b: getCurrentLocationSuccess({
            location: {
              lat: 10.762622,
              lng: 106.660172,
            },
          }),
        });
      });
    });

    it('should dispatch getCurrentLocationFailure when error occurs', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: getCurrentLocation(),
        });

        geolocationSpy.and.callFake((_success, error) => {
          error({
            message: 'Permission denied',
          } as GeolocationPositionError);
        });

        expectObservable(effects.getCurrentLocation$).toBe('-b', {
          b: getCurrentLocationFailure({
            error: 'Permission denied',
          }),
        });
      });
    });

    it('should dispatch getCurrentLocationFailure when geolocation not supported', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        spyOnProperty(navigator, 'geolocation', 'get').and.returnValue(undefined as any);

        actions$ = hot('-a', {
          a: getCurrentLocation(),
        });

        expectObservable(effects.getCurrentLocation$).toBe('-b', {
          b: getCurrentLocationFailure({
            error: 'Geolocation not supported',
          }),
        });
      });
    });
  });
});
