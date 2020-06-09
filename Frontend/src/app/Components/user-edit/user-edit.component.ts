import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  @Input() userData: any = {name: null , password: null};
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
 /* this.rest.getUser(this.route.snapshot.params.userId).subscribe((data: {}) => {
       console.log(data);
       this.userData = data;
       }); */

  }




  updateUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.rest.updateUser(this.route.snapshot.params.userId, this.userData , user).subscribe((result) => {
       if (user.role === 'UTENTE'){
        this.router.navigate(['user']);
      } else if (user.role === 'TECH'){
        this.router.navigate(['technic']);
      } else if (user.role === 'ADMIN') {
        this.router.navigate(['/admin/users']);
      }
           }, (err) => {
          console.log(err);
      });
    }
}
