
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { RouteResult } from '../../services/route/route';
import { getRoute, getRouteFailure, getRouteSuccess } from './route.action';
import { initialSearchMapState, searchMapReducer } from './route.reducer';

describe('SearchReducer', () => {



  it('should set loading true and error null on route action', () => {
    const action = getRoute ({ start:{lat: 10.762622,
                   lng:  106.660172} ,
            end:{
                   lat: 10.776889,
                   lng:  106.700806

              } });
    const state = searchMapReducer ( initialSearchMapState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
    expect(state.results).toEqual([]);
  });

  it('should set results and loading false on routeSuccess', () => {
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
    const results = RouteResult.fromJson(mockResponseResultRoute)
    const action = getRouteSuccess({ route:results});
  const state = searchMapReducer ( initialSearchMapState, action);

    expect(state.routeResult).toEqual(results);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set error and reset results on getRouteFailure', () => {
    const action = getRouteFailure({ error: 'API Error' });
      const state = searchMapReducer ( initialSearchMapState, action);

    expect(state.error).toBe('API Error');
    expect(state.results).toEqual([]);
    expect(state.loading).toBeFalse();
  });

 
});
