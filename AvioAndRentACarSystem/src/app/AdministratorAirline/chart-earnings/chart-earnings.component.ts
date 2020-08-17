import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'chart-earnings',
  templateUrl: './chart-earnings.component.html',
  styleUrls: ['./chart-earnings.component.css']
})
export class ChartEarningsComponent implements OnInit {

  @Input('earnings') earnings : Map<string, number>;

  barChartData: ChartDataSets[];
  barChartLabels: Label[];
  barChartOptions;
  barChartColors: Color[];
  barChartLegend;
  barChartPlugins;
  barChartType;
  
  constructor() { }

  ngOnInit(): void {
    this.barChartOptions = {
    responsive: true,
    };
  
    this.barChartType= 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];

    this.barChartData = [
      { data: Array.from(this.earnings.values()), label: 'Earnings' }
    ];

    this.barChartLabels = Array.from(this.earnings.keys());
  }

}
