import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Subscription } from 'rxjs';
import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {
  @Input()
  user: any ;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  sessionService: any;

  constructor(private authService: AuthenticationService, private rest: RestService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //this.me();
  }

  onLogout() {
    this.user = null;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

 /*  me(){
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
     this.userIsAuthenticated = isAuthenticated;
   });
    this.authService.me().subscribe((user) => {
      this.user = user;
      console.log(this.user);
      if (!this.user) {
        const options = this.authService.expired ? { queryParams: { expired: 'true' } } : undefined;
        this.router.navigate(['/login'], options);
      }
    });
  } */

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
