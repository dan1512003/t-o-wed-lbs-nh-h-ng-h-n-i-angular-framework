import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private baseUrl = this.getBackendUrl();

  constructor(private http: HttpClient) {}


  private getBackendUrl(): string {
    return 'http://localhost:3000';
  }

  private httpOptions = {
    withCredentials: true 
  };

 
// [
//     {
//         "email": "test@example.com",
//         "phone": "0123456785"
//     }
// ]
  // check phone
  checkPhone(phone: string): Observable<any[]> {
    return this.http.post<any[]>(
      `${this.baseUrl}/api/checkphone`,
      { phone },
      this.httpOptions
    ).pipe(
      catchError(err => {
        console.error('checkPhone error', err);
        return of([]);
      })
    );
  }


//   {
//     "user": {
//         "email": "test@example.com",
//         "phone": "0123456785",
//         "image": null,
//         "name": "luka luka"
//     }
// }
  // check email
  checkEmail(email: string, phone: string = ''): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/checkmail`,
      { email, phone },
      this.httpOptions
    ).pipe(
      catchError(err => {
        console.error('checkEmail error', err);
        return of({});
      })
    );
  }

//   {
//     "email": "test@example.com",
//     "phone": "0123456785",
//     "image": null,
//     "name": "luka luka"
// }
  // check token (cookie-based hoặc body)
  checkToken(): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/checktoken`,
     {},
      this.httpOptions
    ).pipe(
      catchError(err => {
        console.error('checkToken error', err);
        return of({});
      })
    );
  }

//   {
//     "user": {
//         "email": "test11@example.com",
//         "phone": "0123456789",
//         "image": null,
//         "name": "Lu Bo"
//     }
// }
  // save user
  saveUser(
    email: string,
    phone: string,
    lastname: string,
    firstname: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/saveuser`,
      {
        email,
        phone,
        lastname,
        firstname
      },
      this.httpOptions
    ).pipe(
      catchError(err => {
        console.error('saveUser error', err);
        return of({});
      })
    );
  }

//   {
//     "user": {
//         "email": "test11@example.com",
//         "phone": "0987654321",
//         "image": null,
//         "name": "Lu Bo"
//     }
// }
  // edit user
  editUser(
    email: string,
    phone: string,
    lastname: string,
    firstname: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/edituser`,
      {
       
        email,
        phone,
        lastname,
        firstname
      },
      this.httpOptions
    ).pipe(
      catchError(err => {
        console.error('editUser error', err);
        return of({});
      })
    );
  }


//   [
//     {
//         "email": "test@example.com",
//         "name": "luka luka",
//         "phone": "0123456785",
//         "image": null
//     }
// ]
  // get user
  getUser(email: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/getuser`,
      {
        params: { email },
        withCredentials: true
      }
    ).pipe(
      catchError(err => {
        console.error('getUser error', err);
        return of([]);
      })
    );
  }
}
