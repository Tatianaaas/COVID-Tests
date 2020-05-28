import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'covid';
  user: any;
  constructor(public authenticationService: AuthenticationService, public router: Router) { }
  ngOnInit(): void {
    this.authenticationService.me().subscribe((user) => {
      this.user = user;
      if (!this.user) {
        const options = this.authenticationService.expired ? { queryParams: { expired: 'true' } } : undefined;
        this.router.navigate(['/login'], options);
      }
    });
  }
}
