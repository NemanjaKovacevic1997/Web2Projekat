import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as Chart from 'chart.js';

@Component({
  selector: 'chart-cards',
  templateUrl: './chart-cards.component.html',
  styleUrls: ['./chart-cards.component.css']
})
export class ChartCardsComponent implements OnInit {
  
  @Input('tickets') soldTicketsOnEachDay? : Map<string, number>;

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions;
  lineChartColors: Color[];
  lineChartLegend;
  lineChartPlugins;
  lineChartType;

  constructor() { }

  ngOnInit(): void {
    this.lineChartData = [
      { data: Array.from(this.soldTicketsOnEachDay.values()) , label: 'Sold tickets' },
    ];
  
    this.lineChartLabels = Array.from(this.soldTicketsOnEachDay.keys());
  
    Chart.defaults.global.defaultFontColor = '#FFFFFF';

    this.lineChartOptions = {
      responsive: true
    };
  
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,0,0.28)',
      
      },
    ];
  
    this.lineChartLegend = true;
    this.lineChartPlugins = [];
    this.lineChartType = 'line';
  }
}
