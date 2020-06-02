import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // add authorization header with jwt token if available
     const user = JSON.parse(localStorage.getItem('user'));
     if (user && user.token) {
         request = request.clone({
            setHeaders: {
               Authorization: `Bearer ${user.token}`
              }
            });
           }
     return next.handle(request);
          }
}
