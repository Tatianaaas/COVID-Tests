import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { RestService } from 'src/app/service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

 infected: any;
 nonInfected: any;
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


  pieChartLabels: Label[] = ['Infetados', 'Não Infetados'];

  pieChartData: number[] = [];

  pieChartType: ChartType = 'pie';

  pieChartLegend = true;

  pieChartPlugins = [];

  pieChartColors = [
    {
      backgroundColor: ['rgba(160,190,216, 1)', 'rgba(72,135,191, 1)', 'rgba(0,0,255,0.3)'],
    },
  ];


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
    this.getTotal();
    this.testsInfected();
    this.testsnonInfected();
    // this.pieChartData = [this.infected, this.nonInfected];

     }

  ngOnInit(): void {
     /* this.testsInfected();
     this.testsnonInfected(); */
  }


  testsInfected(){
    this.rest.getTestsInfected().subscribe((result) => {
      console.log(result);
      this.infected = result;
      console.log('Infetados', this.infected);
      this.pieChartData.push((this.infected / this.totalPeople) * 100);
    }, (err) => {
      console.log(err);
    });
  }

  testsnonInfected(){
    this.rest.getnonInfected().subscribe((result) => {
      console.log(result);
      this.nonInfected = result;
      console.log('Nao infetados', this.nonInfected);
      this.pieChartData.push((this.nonInfected / this.totalPeople) * 100);
    }, (err) => {
      console.log(err);
    });
  }

  getTotal(){
    this.rest.getTotalTests().subscribe((result) => {
      this.totalPeople = result;
      console.log('Total de testes', this.totalPeople);
    })
  }
}
