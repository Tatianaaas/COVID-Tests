import { Component, OnInit, Input } from '@angular/core';

import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Test } from '../../Models/Test';
import { User } from '../../Models/User';

@Component({
  selector: 'app-technic',
  templateUrl: './technic.component.html',
  styleUrls: ['./technic.component.css']
})

export class TechnicComponent implements OnInit {
  @Input() id: number;
  tests: any ;
  opcao: string;
  
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //this.getTests();
  }

  getTestsInfected() {
    this.tests = [];

    this.rest.getOrdersTechInfected().subscribe((data: {}) => {
        console.log(data);
        this.tests = data;
        this.router.navigate(['/technic/tests']);
    });
  }

  getTests() {
    this.tests = [];

    this.rest.getOrdersTech().subscribe((data: {}) => {
        console.log(data);
        this.tests = data;
        this.router.navigate(['/technic/tests']);
    });
  }

  getTestsNoDate() {
    this.tests = [];

    this.rest.getOrdersTechDates().subscribe((data: {}) => {
      console.log(data);
      this.tests = data;
      this.router.navigate(['/technic/tests']);
    });
  }
      
  getTestsFirst() {
    this.tests = [];

    this.rest.getOrdersTechFirst().subscribe((data: {}) => {
      console.log(data);
      this.tests = data;
      this.router.navigate(['/technic/tests']);
    });
  }

  getTestsSecond() {
    this.tests = [];

    this.rest.getOrdersTechSecond().subscribe((data: {}) => {
      console.log(data);
      this.tests = data;
      this.router.navigate(['/technic/tests']);
    });
  }
}
