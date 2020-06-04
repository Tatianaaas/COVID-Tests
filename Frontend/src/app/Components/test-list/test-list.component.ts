import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Test } from '../../Models/Test';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})

export class TestListComponent implements OnInit {
  @Input()
  tests: any;
  // private postsSub: Subscription;
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }

  scheduleTest(id) {
    this.router.navigate([`/technic/scheduleTest/${id}`]);
    }

  resultFirst(id) {
  this.router.navigate([`/technic/results/${id}`]);
  }
}
