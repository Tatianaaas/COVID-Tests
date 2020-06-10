import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Test } from '../../Models/Test';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})

export class TestResultComponent implements OnInit {
   @Input() testData: any ;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getOrder();
  }

  updateFirstResult() {
    this.rest.updateFirstResult(this.route.snapshot.params.userId, this.testData).subscribe((result) => {
      this.router.navigate(['technic/tests']);
    }, (err) => {
      console.log(err);
    });
  }

  updateSecondResult() {
    this.rest.updateSecondResult(this.route.snapshot.params.userId, this.testData).subscribe((result) => {
      this.router.navigate(['technic/tests']);
    }, (err) => {
      console.log(err);
    });
  }

  getOrder(){
    this.rest.getOrderById(this.route.snapshot.params.userId).subscribe((data: {}) => {
      this.testData = data ;
   });
  }
}
