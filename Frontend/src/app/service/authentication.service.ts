import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
         })
    };

@Injectable({
     providedIn: 'root'
    })

     export class AuthenticationService {

      private isAuthenticated = false;
      expired: boolean;
      private authStatusListener = new Subject<boolean>();
      private session: BehaviorSubject<any> = new BehaviorSubject(
        localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user'))
          : null
      );

        constructor(private http: HttpClient) { }

       login(username: number, password: string): Observable<any> {
         this.expired = false;
         const request: any = this.http.post(
          'http://localhost:3000/login',
          {
            username,
            password,
          },
          httpOptions
        )
        .pipe(share());
         request
          .subscribe((response) => {
            const { token, expiresIn, ...user } = response;
            console.log(user);
            this.session.next(user);
            localStorage.setItem('user', JSON.stringify(user) );
            localStorage.setItem('auth-token', token);
          });

         return request;
         }

        logout() {
            // remove user from local storage to log user out
            this.isAuthenticated = false;
            this.expired = false;
            this.session.next(null);
            localStorage.removeItem('user');
            localStorage.removeItem('auth-token');
            // this.http.post('http://localhost:3000/logout', undefined, httpOptions);
            }

        register(username: number, password: string): Observable<any>{
            return this.http.post<any>('http://localhost:3000/signup', { username, password });
          }

          getIsAuth() {
            return this.isAuthenticated;
          }

          getAuthStatusListener() {
            return this.authStatusListener.asObservable();
          }
          me(): Observable<any> {
            return this.session;
          }

      }
