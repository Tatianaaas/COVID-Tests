import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../Models/User';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {
  @Input() users: any;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  getUserList(){
    this.users = [];

    this.rest.getListUsers().subscribe((data: {}) => {
      this.users = data;
      this.router.navigate(['/admin/users'])
    });
  }

  getAdminList(){
    this.users = [];

    this.rest.getListAdmin().subscribe((data: {}) => {
      this.users = data;
      this.router.navigate(['/admin/users'])
    })
  }

  getTechnicList(){
    this.users = [];

    this.rest.getListTechnic().subscribe((data: {}) => {
      this.users = data;
      this.router.navigate(['/admin/users'])
    })
  }

  getUtenteList(){
    this.users = [];

    this.rest.getListUtente().subscribe((data: {}) => {
      this.users = data;
      this.router.navigate(['/admin/users'])
    })
  }
}
