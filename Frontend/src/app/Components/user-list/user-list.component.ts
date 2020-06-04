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
    this.rest.getListUsers().subscribe((data: {}) => {
       this.users = data;
    });

    this.selectedUser = localStorage.getItem('user');
    this.getUser();
  }

  getUser(){
    console.log(this.selectedUser.userId);
    this.rest.getUser(this.selectedUser.userId).subscribe((data: {}) => {
      console.log(data);
      this.selectedUser = data;
      });
  }

  selectUser(id){
    console.log(id);
    this.router.navigate([`/user/update/${id}`]);
  }

  deleteUser(id){
    this.rest.deleteUser(id).subscribe((data: {}) => {
      console.log(data);
    });
  }
}
