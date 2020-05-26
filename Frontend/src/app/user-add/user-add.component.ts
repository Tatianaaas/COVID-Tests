import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import {User} from '../Models/User';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  @Input() userData: User = new User();

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
      }

  createUser(){
    this.rest.createUser(this.userData).subscribe((result: User) => {
        console.log(result);
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      });
    }

}
