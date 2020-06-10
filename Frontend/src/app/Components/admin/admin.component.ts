import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import {User} from '../../Models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  @Input() userData: User = new User();

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  createTech(){
    console.log(this.userData);
    this.rest.createTech(this.userData).subscribe((result: User) => {
        console.log(result);
        this.router.navigate(['/admin/users']);
      }, (err) => {
        console.log(err);
      });
    }
}
