import { TestBed } from '@angular/core/testing';

import { Route, RouteResult, RouteStep } from './route';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Route', () => {

  let service: Route;
  let httpMock:HttpTestingController;
   const baseUrl = 'http://localhost:3000';
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers:[
        Route,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(Route);
    httpMock =TestBed.inject(HttpTestingController);
  });
afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('should return route from payload', () => {
      const payload = {
  startLat: 10.762622,
  startLng: 106.660172,
  endLat: 10.776889,
  endLng: 106.700806
    };
   const mockResponseRoute = {
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

    service.getRoute(payload).subscribe((res) => {
      expect(res).toBe(mockResponseRoute);

    });

      const req = httpMock.expectOne(`${baseUrl}/api/route`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponseRoute);
  }); 
});

describe('RouteResult', () => {
  const mockResultRoute =   {
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
const mockRouteStep=
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

  it('should create a ResultRoute instance from json', () => {

    
let points: { lat: number; lng: number }[]=[];

const route = RouteResult.fromJson(mockResultRoute);
 const geometry = mockResultRoute.geometry;
    if (geometry.coordinates) {
      points = geometry.coordinates.map((coord: number[]) => ({
        lat: coord[1],
        lng: coord[0],
      }));
    }
      let steps: RouteStep[] = [];
        if (mockResultRoute.legs.length) {
          const leg = mockResultRoute.legs[0];
          if (leg.steps) {
            steps = leg.steps.map((s: any) => RouteStep.fromJson(s));
          }
        }
    expect(route).toBeTruthy();
    expect(route.points).toEqual(points);
    expect(route.steps).toEqual(steps);
    expect(route.distance).toBe(mockResultRoute.distance);
    expect(route.duration).toBe(mockResultRoute.duration);
   ;

  });

  it('should create a RouteStep instance from json', () => {

      let instruction = '';
 const type = mockRouteStep.maneuver.type
 const modifier = mockRouteStep.maneuver.modifier
    if (type === 'depart') {
      instruction = 'Start';
    } else if (type === 'arrive') {
      instruction = 'Arrive';
    } else if (type === 'turn' || type === 'continue') {
      switch (modifier) {
        case 'right':
          instruction = 'Turn right';
          break;
        case 'left':
          instruction = 'Turn left';
          break;
        case 'slight right':
          instruction = 'Slight right';
          break;
        case 'slight left':
          instruction = 'Slight left';
          break;
        case 'sharp right':
          instruction = 'Sharp right';
          break;
        case 'sharp left':
          instruction = 'Sharp left';
          break;
        default:
          instruction = 'Go straight';
      }
    } else if (type === 'roundabout') {
      instruction = 'Enter roundabout';
    } else if (type === 'merge') {
      instruction = 'Merge';
    } else if (type === 'on ramp') {
      instruction = 'Enter highway';
    } else if (type === 'off ramp') {
      instruction = 'Exit highway';
    } else if (type === 'fork') {
      instruction = 'Take fork';
    } else if (type === 'end of road') {
      instruction = 'End of road';
    } else {
      instruction = type;
    }

const routestep = RouteStep.fromJson(mockRouteStep);

    expect(routestep).toBeTruthy();
    expect(routestep.distance).toBe(mockRouteStep.distance);
    expect(routestep.duration).toBe(mockRouteStep.duration);
    expect(routestep.name).toBe(mockRouteStep.name);
    expect(routestep.modifier).toBe(modifier);
    expect(routestep.type).toBe(type);
   ;

  });
});
