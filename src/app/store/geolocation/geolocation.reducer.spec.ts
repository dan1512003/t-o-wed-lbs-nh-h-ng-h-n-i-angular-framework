

import { LatLng, RouteResult } from '../../services/route/route';
import { getCurrentLocation, getCurrentLocationFailure, getCurrentLocationSuccess } from './geolocation.action';
import { geolocationReducer, initialGeolocationState } from './geolocation.reducer';


describe('GeolocationReducer', () => {



  it('should set loading true and error null on getCurrentLocation action', () => {

    const action = getCurrentLocation ();
    const state = geolocationReducer( initialGeolocationState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  
  });

  it('should set results and loading false on getCurrentLocationSuccess', () => {
      const  points: LatLng= {lat: 10.762622,
                       lng:  106.660172}
   
    const action = getCurrentLocationSuccess({location:points});
 const state = geolocationReducer( initialGeolocationState, action);

    expect(state.currentLocation).toEqual(points);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set error and reset results on getCurrentLocationFailure', () => {
    const action = getCurrentLocationFailure({ error: 'API Error' });
    const state = geolocationReducer( initialGeolocationState, action);

    expect(state.error).toBe('API Error');
    expect(state.loading).toBeFalse();
  });

 
});
