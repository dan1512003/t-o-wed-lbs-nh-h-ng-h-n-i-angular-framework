import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Review{
  private baseUrl = this.getBackendUrl();

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  private getBackendUrl(): string {
    return 'http://localhost:3000';
  }

  
  getReview(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/review`);
  }

  
  getReviewById(osmId: number): Observable<any[]> {
    const params = new HttpParams().set('osm_id', osmId.toString());
    return this.http.get<any[]>(`${this.baseUrl}/api/review`, { params });
  }

 
  getReviewByEmail(email: string): Observable<any[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<any[]>(`${this.baseUrl}/api/reviewemail`, { params });
  }

  
  getReviewByEmailAndOsmId(
    email: string,
    osmId: number
  ): Observable<any[]> {
    const params = new HttpParams()
      .set('email', email)
      .set('osm_id', osmId.toString());

    return this.http.get<any[]>(`${this.baseUrl}/api/reviewemail`, { params });
  }


  addReview(payload: {
    rateFood: number;
    rateService: number;
    rateAmbience: number;
    overallRating: number;
    command: string;
    idRestaurant: string;
    email: string;
    date: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/addreview`,
      payload,
      { headers: this.headers }
    );
  }

  
  editReview(payload: {
    rateFood: number;
    rateService: number;
    rateAmbience: number;
    overallRating: number;
    command: string;
    idRestaurant: string;
    email: string;
    date: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/editreview`,
      payload,
      { headers: this.headers }
    );
  }
}
