import { initialGeolocationState } from "./geolocation.reducer";
import { selectCurrentLocation, selectGeoLoading, selectPermissionGranted } from "./geolocation.selectors";

describe('Geolocation Selectors', () => {

  it('selectPermissionGranted', () => {
    expect(selectPermissionGranted.projector(initialGeolocationState)).toBeFalse();
  });
 it('selectCurrentLocation', () => {
    expect(selectCurrentLocation.projector(initialGeolocationState)).toEqual(null);
  });

 it('selectGeoLoading ', () => {
 expect(selectGeoLoading .projector(initialGeolocationState)).toBeFalse();
  });

 

});
