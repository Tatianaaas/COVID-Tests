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

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  @Input()
  user: any;
  constructor(private authService: AuthenticationService, private rest: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.userIsAuthenticated = this.authService.getIsAuth();
   this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
   this.rest.getUser(this.route.snapshot.params.userId).subscribe((data: {}) => {
       console.log(data);
       this.user = data;
       });
  }


  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
