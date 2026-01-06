import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Ward {
  private baseUrl = this.getBackendUrl();

  constructor(private http: HttpClient) {}

  private getBackendUrl(): string {
    return 'http://localhost:3000';
  }


  getWard(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/ward`).pipe(
      map((data) => data)
    );
  }

 
  getWardById(id: number): Observable<any> {
    const params = new HttpParams().set('osm_id', id.toString());
    return this.http
      .get<any>(`${this.baseUrl}/api/ward`, { params })
      .pipe(map((data) => data));
  }


  getWardByLatLon(lat: number, lon: number): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString());

    return this.http
      .get<any>(`${this.baseUrl}/api/wardlatlon`, { params })
      .pipe(map((data) => data));
  }
}
