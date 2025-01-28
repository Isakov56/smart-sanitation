import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginCredentials } from 'shared';
// import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'user_info';

  constructor(private http: HttpClient) {}

//   login(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post<{ token: string }>('https://reqres.in/api/login', credentials).pipe(
//       tap(response => {
//         localStorage.setItem('auth_token', response.token);
//       })
//     );
//   }
login(credentials: LoginCredentials): Observable<any> {
    // const url = environment.USER_API_URL;
    return this.http.post('url', credentials, { observe: 'response' }).pipe(
      tap(response => {
        const authHeader = response.headers.get('Authorization');
        const userData = response.body; // Assuming user data is in the body
        if (authHeader && userData) {
          const token = authHeader; // Use the full token as-is
          localStorage.setItem(this.tokenKey, token);
          localStorage.setItem(this.userKey, JSON.stringify(userData)); // Store user info
        } else {
          console.warn('Authorization header or user data missing');
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  test(): Observable<any> {
    return this.http.get('http://localhost:4200/assets/save.json', { observe: 'response' }).pipe(
      tap(response => {
        const userData = response.body;
        if (userData) {
          localStorage.setItem(this.userKey, JSON.stringify(userData));
          console.log('User data fetched and saved to localStorage:', userData);
        } else {
          console.warn('No user data found in the response body');
        }
      }),
      catchError(error => {
        console.error('Error fetching user data from save.json:', error);
        return throwError(() => error);
      })
    );
  }


   // Get token from localStorage
   getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Get user info from localStorage
  getUser(): any | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Logout method
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get user roles
  getUserRoles(permission: string): boolean {
    const user = this.getUser();  // Retrieve user from localStorage
    console.log('User data:', user);  // Check the user data

    if (!user || !user.response || !user.response.permission) {
        console.warn('No user data or permissions found');
        return false;
    }

    // Log the permissions array
    const userPermissions = user.response.permission.map((perm: any) => perm.role); // here we are checking for the permission.function we can do the same for the role and others

    console.log('User Permissions:', userPermissions);

    // Check if the required permission is in the user's permissions list
    return userPermissions.includes(permission);
  }

  // Check if the user has a specific permission
  hasPermission(permission: string): boolean {
    const user = this.getUser();  // Retrieve user from localStorage
    console.log('User data:', user);  // Check the user data

    if (!user || !user.response || !user.response.permission) {
        console.warn('No user data or permissions found');
        return false;
    }

    // Log the permissions array
    const userPermissions = user.response.permission.map((perm: any) => perm.function); // here we are checking for the permission.function we can do the same for the role and others

    console.log('User Permissions:', userPermissions);

    // Check if the required permission is in the user's permissions list
    return userPermissions.includes(permission);
}


}

