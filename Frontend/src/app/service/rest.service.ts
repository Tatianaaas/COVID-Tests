import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import {User} from '../Models/User';
import { Test } from '../Models/Test';

const endpoint = 'http://localhost:3000/';
const httpOptions = {
     headers: new HttpHeaders({
        'Content-Type': 'application/json'
       }) };

@Injectable({
  providedIn: 'root'
})

export class RestService {
  private _user: User;
  user: BehaviorSubject<User>;

  logout() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {
    this._user = JSON.parse(localStorage.getItem('user'));
    this._user = this._user == null ? null : this._user;
    this.user = new BehaviorSubject<User>(this._user);
  }

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
    return this.http.put<User>(endpoint + 'technic/update/' + id, JSON.stringify(user), httpOptions);
  }

    deleteUser(id: string): Observable<User> {
      return this.http.delete<User>(endpoint + 'admin/delete/' + id, httpOptions);
      }
    createOrder(id: string, test: Test): Observable<Test> {
      console.log(id);
      return this.http.put<Test>(endpoint + 'user/ordertest/' + id, JSON.stringify(test), httpOptions);
    }

  updateAdminPassword(id: string, password: string): Observable<User> {
    return this.http.put<User>(endpoint + 'admin/updatepass/' + id, JSON.stringify(password), httpOptions);
  }

  scheduleFirstTest(id: string, date: Date): Observable<Test> {
    return this.http.put<Test>(endpoint + 'technic/scheduleTest/' + id, JSON.stringify(date), httpOptions);
  }

  updateFirstResult(id: string, primeiroResultado: boolean): Observable<Test> {
    return this.http.put<Test>(endpoint + 'technic/results/firstTest/' + id, JSON.stringify(primeiroResultado), httpOptions);
  }

  updateSecondResult(id: string, segundoResultado: boolean): Observable<Test> {
    return this.http.put<Test>(endpoint + 'technic/results/secondTest/' + id, JSON.stringify(segundoResultado), httpOptions);
  }

  getOrders(test: Test): Observable<Test> {
    return this.http.get<Test>(endpoint + 'admin/tests');
  }
}
