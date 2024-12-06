import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('Interceptor Triggered for:', req.url);
      
        if (req.method === 'JSONP') {
          // JSONP does not support headers, so skip adding Authorization
          return next.handle(req);
        }
      
        const startTime = Date.now();
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
      
        return next.handle(modifiedReq).pipe(
          delay(0),  // Adding the 2-second delay
          tap(() => {
            const endTime = Date.now();
            // console.log(`Request delayed by: ${endTime - startTime}ms`); // Should log if interceptor is triggered
          }),
          catchError((error) => {
            console.error('HTTP Error:', error);
            return throwError(() => new Error(error.message));
          })
        );
      }

  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}



