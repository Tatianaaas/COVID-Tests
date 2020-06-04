import { Component, OnInit, Input } from '@angular/core';
import { User } from '../Models/User';
import { RestService } from '../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from '../Models/Test';

@Component({
  selector: 'app-technic',
  templateUrl: './technic.component.html',
  styleUrls: ['./technic.component.css']
})
export class TechnicComponent implements OnInit {

  @Input() id: number;
  tests: any ;
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
