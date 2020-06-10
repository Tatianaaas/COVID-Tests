import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, share } from 'rxjs/operators';

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
    const body = res;
    return body || { };
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(endpoint + 'user/show/' + id, httpOptions);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(endpoint + 'signup', JSON.stringify(user), httpOptions);
  }

  updateUser(id: string, user: User , currentUser: User): Observable<User> {
    console.log(user);
    console.log(currentUser);
    if (currentUser.role === 'UTENTE'){
      return this.http.put<User>(endpoint + 'user/update/' + id, JSON.stringify(user), httpOptions);
    } else if (currentUser.role === 'TECH'){
      return this.http.put<User>(endpoint + 'technic/update/' + id, JSON.stringify(user), httpOptions);
    } else if (currentUser.role === 'ADMIN') {
      return this.http.put<User>(endpoint + 'admin/update/' + id, JSON.stringify(user), httpOptions);
    }
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(endpoint + 'admin/delete/' + id, httpOptions);
  }

  createOrder(id: string, test: Test): Observable<Test> {
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

  getOrders(/* test: Test */): Observable<Test> {
    return this.http.get<Test>(endpoint + 'admin/tests', httpOptions);
  }

  getOrdersTech(): Observable<Test> {
    return this.http.get<Test>(endpoint + 'technic/tests/all', httpOptions);
  }

  getOrdersTechInfected(): Observable<Test> {
    return this.http.get<Test>(endpoint + 'technic/tests/infected', httpOptions);
  }

  getOrdersTechFirst(): Observable<Test> {
    return this.http.get<Test>(endpoint + 'technic/tests/first', httpOptions);
  }

  getOrdersTechSecond(): Observable<Test> {
    return this.http.get<Test>(endpoint + 'technic/tests/second', httpOptions);
  }

  getOrdersTechDates(): Observable<Test> {
    return this.http.get<Test>(endpoint + 'technic/tests/dates', httpOptions);
  }

  getOrderById(id: string): Observable<Test> {
    return this.http.get<Test>(endpoint + 'technic/results/' + id, httpOptions);
  }

  getTest(id: string): Observable<Test> {
    return this.http.get<Test>(endpoint + 'user/test/' + id, httpOptions);
  }

  getListUsers(): Observable<User> {
    return this.http.get<User>(endpoint + 'admin/users/all', httpOptions);
  }

  getListAdmin(): Observable<User> {
    return this.http.get<User>(endpoint + 'admin/users/admin', httpOptions);
  }

  getListTechnic(): Observable<User> {
    return this.http.get<User>(endpoint + 'admin/users/technic', httpOptions);
  }

  getListUtente(): Observable<User> {
    return this.http.get<User>(endpoint + 'admin/users/utente', httpOptions);
  }

  updateUserList(id: string, user: User): Observable<User> {
    return this.http.put<User>(endpoint + 'admin/update/' + id, JSON.stringify(user), httpOptions);
  }

  getTestsDay(test: Test): Observable<Test>{
    console.log(JSON.stringify(test));
    return this.http.post<Test>(endpoint + 'admin/tests/day', JSON.stringify(test) , httpOptions);
  }

  getTestsInfected(): Observable<Test>{
    return this.http.post<Test>(endpoint + 'admin/tests/infected', httpOptions);
  }

  getnonInfected(): Observable<Test>{
    return this.http.post<Test>(endpoint + 'admin/tests/nonInfected', httpOptions);
  }

  getTotalTests(): Observable<Test>{
    return this.http.post<Test>(endpoint + 'admin/tests/total', httpOptions);
  }

  getTotalPerson(username: string): Observable<Test> {
    return this.http.get<Test>(endpoint + 'admin/tests/' + username, httpOptions);
  }

  createTech(user: User): Observable<User> {
    return this.http.post<User>(endpoint + 'admin/signuptechnics', JSON.stringify(user), httpOptions);
  }

  download(id: string){
    return this.http.get(endpoint + 'user/test/file/' + id, { responseType: 'blob' as 'json'});
  }

  handleFile(res: any, fileName: string) {
    const file = new Blob([res], {
      type: res.type
    });

    // IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // link.click();
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(() => { // firefox
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
