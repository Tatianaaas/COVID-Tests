import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { RestService } from 'src/app/service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart-users',
  templateUrl: './pie-chart-users.component.html',
  styleUrls: ['./pie-chart-users.component.css']
})
export class PieChartUsersComponent implements OnInit {

  utentes: any;
  technics: any;
  admins: any ;
  totalPeople: any;
   pieChartOptions: ChartOptions = {
     responsive: true,
     legend: {
       position: 'top',
     },
     tooltips: {
       enabled: true,
       mode: 'single',
       callbacks: {
         label(tooltipItems, data) {
           return data.datasets[0].data[tooltipItems.index] + ' %';
         }
       }
     },
   };


   pieChartLabels: Label[] = ['Utentes', 'Tecnicos', 'Administradores'];

   pieChartData: number[] = [];

   pieChartType: ChartType = 'pie';

   pieChartLegend = true;

   pieChartPlugins = [];

   pieChartColors = [
     {
       backgroundColor: ['rgba(160,190,216, 1)', 'rgba(72,135,191, 1)', 'rgba(19,62,89, 1)'],
     },
   ];


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
    this.getTotal();
    this.getUtentes();
    this.getTech();
    this.getAdmin();
   }

  ngOnInit(): void {
  }

  getUtentes(){
    this.rest.getListUtente().subscribe((result) => {
      console.log(result);
      this.utentes = result;
      console.log('Utentes', this.utentes.length);
      this.pieChartData.push((this.utentes.length / this.totalPeople.length) * 100);
      console.log(this.pieChartData);
    }, (err) => {
      console.log(err);
    });
  }
  getTech(){
    this.rest.getListTechnic().subscribe((result) => {
      console.log(result);
      this.technics = result;
      console.log('Tecnico', this.technics.length);
      this.pieChartData.push((this.technics.length / this.totalPeople.length) * 100);
      console.log(this.pieChartData);
    }, (err) => {
      console.log(err);
    });
  }

  getAdmin(){
    this.rest.getListAdmin().subscribe((result) => {
      console.log(result);
      this.admins = result;
      console.log('Administrador', this.admins.length);
      this.pieChartData.push((this.admins.length / this.totalPeople.length) * 100);
      console.log(this.pieChartData);
    }, (err) => {
      console.log(err);
    });
  }

  getTotal(){
    this.rest.getListUsers().subscribe((result) => {
      console.log(result);
      this.totalPeople = result;
      console.log('Total', this.totalPeople.length);
    }, (err) => {
      console.log(err);
    });
  }

}
