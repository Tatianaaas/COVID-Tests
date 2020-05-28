import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Test } from '../Models/Test';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css']
})

export class TestAddComponent implements OnInit {
  @Input() testData: Test = new Test();
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(){
      }

  createOrder(){
    console.log(this.testData);

    this.rest.createOrder(this.route.snapshot.params.userId, this.testData).subscribe((result: Test) => {
        console.log(result);
        //this.router.navigate(['user/show/' + result._id]);
      }, (err) => {
        console.log(err);
      });
    }
}
