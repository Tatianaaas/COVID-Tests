import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any ;
  constructor(private router: Router, private authServive: AuthenticationService) { }

  ngOnInit(): void {

  }
  login(form: NgForm): void {
    console.log(form.value.username, form.value.password);
    this.authServive.login(form.value.username, form.value.password).subscribe((user: any) => {
        if (user && user.token) {
           // store user details and jwt token in local storage to keep user logged in between page refreshes
           console.log(user);
           localStorage.setItem('user', JSON.stringify(user));
           localStorage.setItem('auth-token', user.token);
           this.router.navigate([`user/show/${user.userId}`]);
             }
        });
  }
}
