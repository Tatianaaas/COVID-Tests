import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() username: number;
  @Input() password: string;

  constructor(private router: Router, private authServive: AuthenticationService) { }

  ngOnInit(): void {
  }
  login(): void {
     this.authServive.login(this.username, this.password).subscribe((user: any) => {
        if (user && user.token) {
           // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['']);
             }
        });
  }

}
