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

  constructor(private authService: AuthenticationService, private rest: RestService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let dados = null;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    dados = JSON.parse(localStorage.getItem('currentUser'));
    this.rest.getUser(dados.userId).subscribe((data: {}) => {
      this.user = data;
   });
  }


  onLogout() {
    this.user = null;
    this.authService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
