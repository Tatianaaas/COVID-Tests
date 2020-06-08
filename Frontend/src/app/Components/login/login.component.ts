import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any ;
  errors: string;
  constructor(private router: Router, private authServive: AuthenticationService) { }

  ngOnInit(): void {

  }
  login(form: NgForm): void {
   /*  this.authServive.login(form.value.username, form.value.password).subscribe((user: any) => {
        if (user && user.token) {
           // store user details and jwt token in local storage to keep user logged in between page refreshes
           console.log(user);
           this.router.navigate([`user/show/${user.userId}`]);
             }
        });
 */
    this.errors = '';

    this.authServive.login(form.value.username, form.value.password)
    .subscribe(
      (user) => {
        this.user = user;
        console.log(this.user);
        if (this.user.role === 'UTENTE'){
          this.router.navigate(['user']);
        } else if (this.user.role === 'TECH'){
          this.router.navigate(['technic']);
        } else if (this.user.role === 'ADMIN') {
          this.router.navigate(['admin']);
        }
    },
      (error) => {
        if (error.status === 401) {
          this.errors = 'Invalid credentials.';
        } else {
          this.errors = error.message;
        }
      }
    );
  }
}
