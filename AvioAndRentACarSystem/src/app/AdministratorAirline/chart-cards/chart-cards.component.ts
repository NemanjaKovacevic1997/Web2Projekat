import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as Chart from 'chart.js';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'chart-cards',
  templateUrl: './chart-cards.component.html',
  styleUrls: ['./chart-cards.component.css']
})
export class ChartCardsComponent implements OnChanges {
  
  @Input('tickets') soldTicketsOnEachDay? : Map<string, number>;

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions;
  lineChartColors: Color[];
  lineChartLegend;
  lineChartPlugins;
  lineChartType;
  sortedList: Array<string>;

  constructor() { 

    this.sortedList = new Array<string>();

    this.lineChartOptions = {
      responsive: true
    };
  
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: '#5bc0de',
      
      },
    ];
  
    this.lineChartLegend = true;
    this.lineChartPlugins = [];
    this.lineChartType = 'line';
  }

  ngOnInit(){

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)

    this.lineChartData = [
      { data: Array.from(this.soldTicketsOnEachDay.values()) , label: 'Rented cars' },
    ];

    this.lineChartLabels = Array.from(this.soldTicketsOnEachDay.keys());

    Chart.defaults.global.defaultFontColor = '#FFFFFF';
  }
}
