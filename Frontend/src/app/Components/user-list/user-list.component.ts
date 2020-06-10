import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../Models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  @Input()
  users: any;
  id: any;
  selectedUser: any;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.selectedUser = localStorage.getItem('user');

    this.rest.getUser(this.selectedUser.userId).subscribe((data: {}) => {
      this.selectedUser = data;
      });
  }

  selectUser(id){
    this.router.navigate([`/admin/update/${id}`]);
  }

  deleteUser(id){
    this.rest.deleteUser(id).subscribe((data: {}) => {
      this.rest.getListUsers().subscribe((newData: {}) => {
        this.users = newData;
     });

      this.router.navigate(['/admin/users/all']);
    });
  }
}
