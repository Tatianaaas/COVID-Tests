import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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
        localStorage.getItem('currentUser')
          ? JSON.parse(localStorage.getItem('currentUser'))
          : null
      );

        constructor(private http: HttpClient) { }

       login(username: number, password: string): Observable<any> {
          this.isAuthenticated = true;
          this.expired = false;
          return this.http.post<any>('http://localhost:3000/login', JSON.stringify({ username, password }), httpOptions);
         }

        logout() {
            // remove user from local storage to log user out
            this.isAuthenticated = false;
            this.expired = true;
            localStorage.removeItem('currentUser');
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
            console.log(this.session);
            return this.session;
          }

      }
