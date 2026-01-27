import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Place {
  private baseUrl ='http://localhost:3000/api/search';
  private reverseUrl = 'http://localhost:3000/api/reverse';
  constructor(private http : HttpClient){};
  searchPlace(query:string):Observable<any>{

    
    return this.http.get<any>(this.baseUrl,{params: { q: query }})
  }
  getAddressFromLatLon(lat:number,lon:number):Observable<string>{


     return this.http.get<any>(this.reverseUrl, {
      params: {
        lat: lat.toString(),
        lon: lon.toString()
      }
    }).pipe(
      map((data)=>{
        const displayName = data?.displayName;
        return displayName && typeof displayName === 'string'
          ? displayName
          : 'Không tìm thấy địa chỉ';
      })
     )
  }
}
