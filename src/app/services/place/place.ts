import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Place {
  private baseUrl ='https://nominatim.openstreetmap.org/search';
  private reverseUrl = 'https://nominatim.openstreetmap.org/reverse';
  constructor(private http : HttpClient){};
  searchPlace(query:string):Observable<any>{
    const params = new HttpParams()
    .set('q', query)
      .set('format', 'geojson')
      .set('addressdetails', '1')
      .set('countrycodes', 'vn');
    return this.http.get<any>(this.baseUrl,{params})
  }
  getAddressFromLatLon(lat:number,lon:number):Observable<string>{
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('format', 'jsonv2')
      .set('addressdetails', '1');

     return this.http.get<any>(this.reverseUrl,{params}).pipe(
      map((data)=>{
        const displayName = data?.display_name;
        return displayName && typeof displayName === 'string'
          ? displayName
          : 'Không tìm thấy địa chỉ';
      })
     )
  }
}
