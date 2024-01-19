// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:8000';  // Update with your backend URL

//   constructor(private http: HttpClient) { }

//   login(username: string, password: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/token`, { username, password });
//   }

//   register(username: string, password: string): Observable<any> {
//     console.log(username, password);
//     return this.http.post(`${this.baseUrl}/register`, { username, password });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000';  // Update with your backend URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/token`, { username, password })
      .pipe(
        tap((response: any) => localStorage.setItem('token', response.access_token))
      );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
