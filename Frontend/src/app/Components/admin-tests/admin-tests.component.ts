import { Component, OnInit } from '@angular/core';

import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-tests',
  templateUrl: './admin-tests.component.html',
  styleUrls: ['./admin-tests.component.css']
})

export class AdminTestsComponent implements OnInit {
  tests: any;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getTests();
  }

  getTests() {
    this.tests = [];
    this.rest.getOrdersTech().subscribe((data: {}) => {
       console.log(data);
       this.tests = data;
        });
        }
}
