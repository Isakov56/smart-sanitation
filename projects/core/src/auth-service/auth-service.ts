import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>('https://reqres.in/api/login', credentials).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
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

