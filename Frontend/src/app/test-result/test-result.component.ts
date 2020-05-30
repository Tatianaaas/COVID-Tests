import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Test } from '../Models/Test';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})

export class TestResultComponent implements OnInit {
  @Input() testData: any = { primeiroResultado: null, segundoResultado: null }

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  updateFirstResult() {
    this.rest.updateFirstResult(this.route.snapshot.params.userId, this.testData).subscribe((result) => {
      console.log(result);
      //this.router.navigate(['user/show/' + result._id]);
    }, (err) => {
      console.log(err);
    });
  }

  updateSecondResult() {
    this.rest.updateSecondResult(this.route.snapshot.params.userId, this.testData).subscribe((result) => {
      console.log(result);
      //this.router.navigate(['user/show/' + result._id]);
    }, (err) => {
      console.log(err);
    });
  }
}
