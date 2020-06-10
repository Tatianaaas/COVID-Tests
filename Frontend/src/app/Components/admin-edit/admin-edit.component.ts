import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../service/rest.service';
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
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rest.getUser(this.user.userId).subscribe((result) => {
      this.user = result;
      });
  }

  updateUser() {
    this.rest.updateAdminPassword(this.user.userId, this.password).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.router.navigate(['admin/show/' + result._id]);
    }, (err) => {
      console.log(err);
    });
  }
}
