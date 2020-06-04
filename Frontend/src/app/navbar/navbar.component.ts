import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Subscription } from 'rxjs';
import { RestService } from '../service/rest.service';
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
  }


  onLogout() {
    this.user = null;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
