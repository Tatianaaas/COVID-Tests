import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tests-statistics',
  templateUrl: './tests-statistics.component.html',
  styleUrls: ['./tests-statistics.component.css']
})
export class TestsStatisticsComponent implements OnInit {
  @Input() testData: any = {data: null};
  result: any;
  infected: any;
  nonInfected: any;
  total: any;
  @Input() id: any;
  totalUser: any;
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.result = null;
    this.testsInfected();
    this.testsnonInfected();
    this.testsTotal();
  }

  testsData(){
    this.rest.getTestsDay(this.testData).subscribe((result) => {
      // console.log(result);
      this.result = result;
      this.router.navigate(['admin/statistics']);
    }, (err) => {
      console.log(err);
    });
  }

  testsInfected(){
    this.rest.getTestsInfected().subscribe((result) => {
      console.log(result);
      this.infected = result;
     // this.router.navigate(['admin/statistics']);
    }, (err) => {
      console.log(err);
    });
  }
  testsnonInfected(){
    this.rest.getnonInfected().subscribe((result) => {
      console.log(result);
      this.nonInfected = result;
     // this.router.navigate(['admin/statistics']);
    }, (err) => {
      console.log(err);
    });
  }
  testsTotal(){
    this.rest.getTotalTests().subscribe((result) => {
      console.log(result);
      this.total = result;
     // this.router.navigate(['admin/statistics']);
    }, (err) => {
      console.log(err);
    });
  }

  getTotalUser(){
    this.rest.getTotalPerson(this.id).subscribe((result) => {
      console.log(result);
      this.totalUser = result;
      //this.router.navigate(['admin/statistics']);
    }, (err) => {
      console.log(err);
    });
  }
}
