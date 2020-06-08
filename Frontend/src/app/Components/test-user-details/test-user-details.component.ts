import { Component, OnInit } from '@angular/core';
import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var require: any ;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-test-user-details',
  templateUrl: './test-user-details.component.html',
  styleUrls: ['./test-user-details.component.css']
})

export class TestUserDetailsComponent implements OnInit {
  test: any;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.userId);

    this.rest.getTest(user.userId).subscribe((data: {}) => {
       console.log(data);
       this.test = data;
    });

  }

  openDoc(id: string){

    //const path = 'C:/Users/tatip/Desktop/Pastas Desktop/materia/PAW/2019-2020/TrabalhoPAW/TrabalhoPAW-master/TrabalhoPAW/Backend/api/docs/';
    const path = `file:///C:Users/tatip/Desktop/Pastas Desktop/materia/PAW/2019-2020/TrabalhoPAW/TrabalhoPAW-master/TrabalhoPAW/Backend/api/docs/${id}.pdf`;
    const pdfUrl = path + id + '.pdf';
    const startPage = 1;
    console.log(id, path);
   // window.open(pdfUrl + '#page=' + startPage, '_blank', '', true);
    //FileSaver.saveAs(path, id);
    this.rest.download(id).subscribe((res: any) => {
      this.rest.handleFile(res, 'report.pdf');
    });
  }

}
