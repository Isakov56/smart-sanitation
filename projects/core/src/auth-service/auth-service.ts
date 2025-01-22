import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

//   login(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post<{ token: string }>('https://reqres.in/api/login', credentials).pipe(
//       tap(response => {
//         localStorage.setItem('auth_token', response.token);
//       })
//     );
//   }
login(credentials: { username: string; password: string; type: string }): Observable<any> {
    return this.http.post('http://192.168.25.16:8090/token', credentials, { observe: 'response' }).pipe(
      tap(response => {
        const authHeader = response.headers.get('Authorization');
        if (authHeader ) {
          const token = authHeader // Extract token from "Bearer <token>"
          localStorage.setItem(this.tokenKey, token);
        } else {
          console.warn('Authorization header missing or invalid');
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  
  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

