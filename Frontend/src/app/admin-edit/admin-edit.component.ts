import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  user: any;
  @Input() password: string;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.rest.getUser(this.route.snapshot.params.userId).subscribe((data: {}) => {
      console.log(data);
      this.user = data;
   });
  }

  updateUser() {
    this.rest.updateAdminPassword(this.route.snapshot.params.userId, this.password).subscribe((result) => {
      console.log(result._id);
      this.router.navigate(['admin/show/' + result._id]);
      }, (err) => {
         console.log(err);
        });
        }

}
