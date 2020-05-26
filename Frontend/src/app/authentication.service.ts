import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

        constructor(private http: HttpClient) { }

       login(username: number, password: string): Observable<any> {
          return this.http.post<any>('http://localhost:3000/login', JSON.stringify({ username, password }), httpOptions);
         }

        logout() {
            // remove user from local storage to log user out
            localStorage.removeItem('currentUser');
            }

        register(username: number, password: string): Observable<any>{
            return this.http.post<any>('http://localhost:3000/signup', { username, password });
          }
      }
