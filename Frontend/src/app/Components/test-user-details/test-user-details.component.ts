import { Component, OnInit } from '@angular/core';
import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-user-details',
  templateUrl: './test-user-details.component.html',
  styleUrls: ['./test-user-details.component.css']
})

export class TestUserDetailsComponent implements OnInit {
  test: any;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.userId);

    this.rest.getTest(user.userId).subscribe((data: {}) => {
       console.log(data);
       this.test = data;
    });
  }
}
