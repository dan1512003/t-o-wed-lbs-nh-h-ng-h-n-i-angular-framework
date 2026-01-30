import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LatLng {
  lat: number;
  lng: number;
}
export interface RoutePayload {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

@Injectable({
  providedIn: 'root',
})
export class Route {
  private baseUrl = this.getBackendUrl();

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  private getBackendUrl(): string {
    return 'http://localhost:3000';
  }


  getRoute(payload: RoutePayload): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/route`,
      payload,
      { headers: this.headers }
    );
  }
}




export class RouteResult {
  points: LatLng[];
  distance: number;
  duration: number;
  steps: RouteStep[];

  constructor(params: {
    points: LatLng[];
    distance: number;
    duration: number;
    steps: RouteStep[];
  }) {
    this.points = params.points;
    this.distance = params.distance;
    this.duration = params.duration;
    this.steps = params.steps;
  }

  static fromJson(json: any): RouteResult {
    let points: LatLng[] = [];

    const geometry = json?.geometry;
    if (geometry?.coordinates) {
      points = geometry.coordinates.map((coord: number[]) => ({
        lat: coord[1],
        lng: coord[0],
      }));
    }

    let steps: RouteStep[] = [];
    if (json?.legs?.length) {
      const leg = json.legs[0];
      if (leg.steps) {
        steps = leg.steps.map((s: any) => RouteStep.fromJson(s));
      }
    }

    return new RouteResult({
      points,
      distance: json?.distance ?? 0,
      duration: json?.duration ?? 0,
      steps,
    });
  }


  get distanceText(): string {
    if (this.distance < 1000) {
      return `${this.distance.toFixed(0)} m`;
    }
    return `${(this.distance / 1000).toFixed(2)} km`;
  }

  get durationText(): string {
    const minutes = Math.round(this.duration / 60);
    if (minutes < 60) {
      return `${minutes} phút`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} giờ ${mins} phút`;
  }
}
export class RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  name?: string;
  type: string;
  modifier: string;

  constructor(params: {
    instruction: string;
    distance: number;
    duration: number;
    name?: string;
    type?: string;
    modifier?: string;
  }) {
    this.instruction = params.instruction;
    this.distance = params.distance;
    this.duration = params.duration;
    this.name = params.name;
    this.type = params.type ?? '';
    this.modifier = params.modifier ?? '';
  }

  static fromJson(json: any): RouteStep {
    const maneuver = json?.maneuver ?? {};
    const type = maneuver.type ?? '';
    const modifier = maneuver.modifier ?? '';

    let instruction = '';

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

    return new RouteStep({
      instruction,
      distance: json?.distance ?? 0,
      duration: json?.duration ?? 0,
      name: json?.name,
      type,
      modifier,
    });
  }



  get distanceText(): string {
    if (this.distance < 1000) {
      return `${this.distance.toFixed(0)} m`;
    }
    return `${(this.distance / 1000).toFixed(2)} km`;
  }

  get durationText(): string {
    const minutes = Math.round(this.duration / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} h ${mins} min`;
  }
}
