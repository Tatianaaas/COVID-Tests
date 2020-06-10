import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() userData: any;
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    
    this.rest.getUser(user.userId).subscribe((data: {}) => {
       this.userData = data;
    });
  }
}
