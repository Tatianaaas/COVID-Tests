import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Subscription } from 'rxjs';
import { RestService } from '../service/rest.service';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private authService: AuthenticationService, private rest: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.userIsAuthenticated = this.authService.getIsAuth();
   this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logout();
    this.user = null;
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
