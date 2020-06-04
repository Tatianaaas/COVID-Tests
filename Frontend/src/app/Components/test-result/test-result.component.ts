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
   @Input() testData: any = { primeiroResultado: null , segundoResultado: null};

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getOrder();
    console.log(this.testData);
  }

  updateFirstResult() {
    console.log(this.testData);
    this.rest.updateFirstResult(this.route.snapshot.params.userId, this.testData).subscribe((result) => {
      console.log(result);
      this.router.navigate(['technic/tests']);
    }, (err) => {
      console.log(err);
    });
  }

  updateSecondResult() {
    this.rest.updateSecondResult(this.testData._id, this.testData).subscribe((result) => {
      console.log(result);
      this.router.navigate(['technic/tests']);
    }, (err) => {
      console.log(err);
    });
  }

  getOrder(){
    console.log(this.route.snapshot.params.userId);
    this.rest.getOrderById(this.route.snapshot.params.userId).subscribe((data: {}) => {
      console.log(data);
      this.testData = data ;
   });
  }
}
