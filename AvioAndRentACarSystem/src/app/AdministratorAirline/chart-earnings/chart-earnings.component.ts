import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'chart-earnings',
  templateUrl: './chart-earnings.component.html',
  styleUrls: ['./chart-earnings.component.css']
})
export class ChartEarningsComponent implements OnChanges {

  @Input('earnings') earnings : Map<string, number>;

  barChartData: ChartDataSets[];
  barChartLabels: Label[];
  barChartOptions;
  barChartColors: Color[];
  barChartLegend;
  barChartPlugins;
  barChartType;
  
  constructor() { 
    this.barChartOptions = {
      responsive: true,
      };
    
      this.barChartType= 'bar';
      this.barChartLegend = true;
      this.barChartPlugins = [];
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)

    this.barChartData = [
      { data: Array.from(this.earnings.values()), label: 'Earnings' }
    ];

    this.barChartLabels = Array.from(this.earnings.keys());
  }
}
