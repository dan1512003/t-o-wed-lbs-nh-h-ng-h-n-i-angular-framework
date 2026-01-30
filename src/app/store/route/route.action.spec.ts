
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { LatLng, RouteResult, RouteStep } from '../../services/route/route';
import { getRoute, getRouteFailure, getRouteSuccess } from './route.action';

  const mockResponseResultRoute =   {
    "legs": [
        {
            "steps": [
                {
                    "intersections": [
                        {
                            "out": 0,
                            "entry": [
                                true
                            ],
                            "bearings": [
                                78
                            ],
                            "location": [
                                106.660185,
                                10.762561
                            ]
                        }
                    ],
                    "driving_side": "right",
                    "geometry": {
                        "coordinates": [
                            [
                                106.660185,
                                10.762561
                            ],
                            [
                                106.660329,
                                10.762591
                            ]
                        ],
                        "type": "LineString"
                    },
                    "maneuver": {
                        "bearing_after": 78,
                        "bearing_before": 0,
                        "location": [
                            106.660185,
                            10.762561
                        ],
                        "modifier": "left",
                        "type": "depart"
                    },
                    "name": "Hẻm 189 Đường Lý Thường Kiệt",
                    "mode": "driving",
                    "weight": 13.4,
                    "duration": 9.5,
                    "distance": 16.1
                }
            ],
            "weight": 423,
            "summary": "Đường 3 Tháng 2, Cách Mạng Tháng 8",
            "duration": 419.1,
            "distance": 5895.7
        }
    ],
    "weight_name": "routability",
    "geometry": {
        "coordinates": [
            [
                106.660185,
                10.762561
            ],
            [
                106.660329,
                10.762591
            ]
        ],
        "type": "LineString"
    },
    "weight": 423,
    "duration": 419.1,
    "distance": 5895.7
}
describe('Route Actions', () => {

  it('should create route action ', () => {
   
    const action = getRoute ({ start:{lat: 10.762622,
                   lng:  106.660172} ,
            end:{
                   lat: 10.776889,
                   lng:  106.700806

              } });

    expect(action.type).toBe('[SearchMap] Get Route');
 
  });

  it('should create getRouteSuccess action with results mapped from mockResponseResultRoute ', () => {
    const results = RouteResult.fromJson(mockResponseResultRoute)
 let points: LatLng[] = [];

    const geometry = mockResponseResultRoute.geometry;
    if (geometry?.coordinates) {
      points = geometry.coordinates.map((coord: number[]) => ({
        lat: coord[1],
        lng: coord[0],
      }));
    }

    let steps: RouteStep[] = [];
    if (mockResponseResultRoute.legs.length) {
      const leg = mockResponseResultRoute.legs[0];
      if (leg.steps) {
        steps = leg.steps.map((s: any) => RouteStep.fromJson(s));
      }
    }

    const action =getRouteSuccess({ route:results });

    expect(action.type).toBe('[SearchMap] Get Route Success');
    expect(action.route.steps).toEqual(steps);
    expect(action.route.points).toEqual(points);
    expect(action.route.distance).toBe(mockResponseResultRoute.distance);
    expect(action.route.duration).toBe(mockResponseResultRoute.duration);

  });

  it('should create searchFailure action with error', () => {
    const error = { message: 'Something went wrong' };
    const action = getRouteFailure({error:error.message });

    expect(action.type).toBe('[SearchMap] Get Route Failure');
    expect(action.error).toEqual(error.message);
  });

});
