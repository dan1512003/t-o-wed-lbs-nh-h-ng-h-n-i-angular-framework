
import { LatLng } from '../../services/route/route';
import { getCurrentLocation, getCurrentLocationFailure, getCurrentLocationSuccess, locationPermissionDenied, locationPermissionGranted, requestLocationPermission } from './geolocation.action';

describe('Geolocation Actions', () => {

  it('should create requestLocationPermission action', () => {
   
    const action =requestLocationPermission();

    expect(action.type).toBe('[Geolocation] Request Permission');
 
  });
  it('should create locationPermissionGranted action', () => {
   
    const action =locationPermissionGranted();

    expect(action.type).toBe('[Geolocation] Permission Granted');
 
  });
    it('should create locationPermissionDenied action', () => {
   
    const action =locationPermissionDenied();

    expect(action.type).toBe('[Geolocation] Permission Denied');
 
  });
      it('should create getCurrentLocation action', () => {
   
    const action =getCurrentLocation();

    expect(action.type).toBe('[Geolocation] Get Current Location');
 
  });
  it('should create getCurrentLocationSuccess action with results mapped from mockResponseResultRoute ', () => {
   
 const  points: LatLng= {lat: 10.762622,
                   lng:  106.660172}



    const action =getCurrentLocationSuccess({location: points });

    expect(action.type).toBe('[Geolocation] Get Current Location Success');
    expect(action.location).toEqual(points);


  });

  it('should create getCurrentLocationFailure  action with error', () => {
    const error = { message: 'Something went wrong' };
    const action =getCurrentLocationFailure ({error:error.message });

    expect(action.type).toBe('[Geolocation] Get Current Location Failure');
    expect(action.error).toEqual(error.message);
  });

});
