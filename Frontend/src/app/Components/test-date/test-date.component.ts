import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Test } from '../../Models/Test';

@Component({
  selector: 'app-test-date',
  templateUrl: './test-date.component.html',
  styleUrls: ['./test-date.component.css']
})

export class TestDateComponent implements OnInit {
  @Input() testData: any = { dataPrimeiroTeste: null };

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
  }

  scheduleFirstTest(){
    this.rest.scheduleFirstTest(this.route.snapshot.params.userId, this.testData).subscribe((result) => {
      this.router.navigate(['technic']);
    }, (err) => {
      console.log(err);
    });
  }
}
