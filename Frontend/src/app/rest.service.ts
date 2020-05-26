import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import {User} from './Models/User';
const endpoint = 'http://localhost:3000/';
const httpOptions = {
     headers: new HttpHeaders({
        'Content-Type': 'application/json'
       }) };

@Injectable({
  providedIn: 'root'
})
export class RestService {
  logout() {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
     let body = res;
     return body || { };
    }

    getUser(id: string): Observable<User> {
       return this.http.get<User>(endpoint + 'user/show/' + id);
      }

    createUser(user: User): Observable<User> {
       console.log(user);
       return this.http.post<User>(endpoint + 'signup', JSON.stringify(user), httpOptions );
       }

    updateUser(id: string, user: User): Observable<User> {
      return this.http.put<User>(endpoint + 'user/update/' + id, JSON.stringify(user), httpOptions);
    }
    deleteProduct(id: string): Observable<User> {
      return this.http.delete<User>(endpoint + 'admin/delete/' + id, httpOptions);
      }

    }
