import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'filter-flights',
  templateUrl: './filter-flights.component.html',
  styleUrls: ['./filter-flights.component.css']
})
export class FilterFlightsComponent implements OnInit {
  cities2 = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
  ];

  selectedCityIds: string[];

  minValue1: number = 100;
  maxValue1: number = 400;
  options1: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b style="color:white">Min price:</b> ' + value + 'EU';
        case LabelType.High:
          return '<b style="color:white">Max price:</b> ' + value + 'EU';
        default:
          return value + 'EU';
      }
    }
  };

  minValue2: number = 1;
  maxValue2: number = 9;
  options2: Options = {
    floor: 0,
    ceil: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min length:</b>' + value + 'h';
        case LabelType.High:
          return '<b>Max length:</b>' + value + 'h';
        default:
          return value + 'h';
      }
    }
  };
  
  constructor() { }

  ngOnInit(): void {
  }
}
