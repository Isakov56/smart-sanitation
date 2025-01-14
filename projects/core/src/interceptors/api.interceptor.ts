import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptor {


  
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

        // console.log('request', req.url)

        return next.handle(req).pipe(
          map((response: HttpEvent<any>) => {
            if (response instanceof HttpResponse) {
              // console.log('received response ', response.headers.get('Content-Type'))
            }else{
              // console.log('received response ............',response.type)
            }
            
            return response;
          }),  
          catchError((error) => {
            console.error('HTTP Error:', error);
            return throwError(() => new Error(error.message));
          })      
        );
/*
        return next.handle(modifiedReq).pipe(
          delay(0),  // Adding the 2-second delay
          tap(() => {
            const endTime = Date.now();
            console.log(`Interceptor is triggered`); // Should log if interceptor is triggered
          }),
          catchError((error) => {
            console.error('HTTP Error:', error);
            return throwError(() => new Error(error.message));
          })
        );
*/

    }
    private parseResponse(response: HttpResponse<any>): HttpResponse<any> {
      const contentTypeHeaderValue = response.headers.get('Content-Type');
      return response;
    }


  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}



