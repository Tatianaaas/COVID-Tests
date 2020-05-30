import { Component, OnInit } from '@angular/core';

import { RestService } from '../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
