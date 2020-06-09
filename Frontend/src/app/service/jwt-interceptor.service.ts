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
     const token = localStorage.getItem('auth-token');
     //console.log(token);
     let modified = request;
     if (token) {
      modified = request.clone({ setHeaders: { 'Authorization': `Bearer ${ token }` } });
}

     return next.handle(modified);

}
}
