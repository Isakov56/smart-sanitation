import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Makes this service available in the app without importing it explicitly
})
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`, // Replace with your token logic
      },
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);

        // Add custom error handling, if needed
        if (error.status === 401) {
          console.error('Unauthorized error!');
        }

        return throwError(() => new Error(error.message));
      })
    );
  }

  private getToken(): string {
    // Replace with your logic to fetch a token
    return localStorage.getItem('authToken') || '';
  }
}
