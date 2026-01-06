import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Restaurant {

  private baseUrl = this.getBackendUrl();

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  private getBackendUrl(): string {
    return 'http://localhost:3000'; 
  }


  getRestaurant(): Observable<any> {
    const url = `${this.baseUrl}/api/restaurant`;

    return this.http.get<any>(url);
  }

  
  getRestaurantById(id: number): Observable<any> {
    const url = `${this.baseUrl}/api/restaurantid`;
    const params = new HttpParams().set('osm_id', id.toString());

    return this.http.get<any>(url, { params });
  }


  getRestaurantByIdWard(id: number): Observable<any> {
    const url = `${this.baseUrl}/api/restaurant`;
    const params = new HttpParams().set('osm_id', id.toString());

    return this.http.get<any>(url, { params });
  }

 
  // getRestaurantBound(
  //   minLon: number,
  //   minLat: number,
  //   maxLon: number,
  //   maxLat: number
  // ): Observable<any> {
  //   const url = `${this.baseUrl}/api/restaurantbound`;

  //   const body = {
  //     minLon,
  //     minLat,
  //     maxLon,
  //     maxLat,
  //   };

  //   return this.http.post<any>(url, body, {
  //     headers: this.headers,
  //   });
  // }
}
