import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { AirlineService } from '../Services/Airline/airline.service';
import { Airline } from '../AirlineModel/airline';
import { FilterData } from '../AirlineModel/HelperModel/filterData';

@Component({
  selector: 'filter-flights',
  templateUrl: './filter-flights.component.html',
  styleUrls: ['./filter-flights.component.css']
})
export class FilterFlightsComponent implements OnInit {

  @Output() change = new EventEmitter<FilterData>();
  
  airlines: Array<{id: number, name: string}> = [
    {id: 1, name: 'Turkish Airlines'},
    {id: 2, name: 'Qatar Airways'}
  ];
  ;
  selectedAirlinesIds: string[];

  

  //selectedCityIds: string[];

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
  
  constructor(private airlineService: AirlineService) {
  }

  ngOnInit(): void {
    this.directCheckbox = false;
    this.oneCheckbox = false;
    this.twoPlusCheckbox = false;
  }

  directCheckbox: boolean;
  oneCheckbox: boolean;
  twoPlusCheckbox: boolean;

  filterClick() {
    let filterData: FilterData = new FilterData();
    filterData.selectedAirlinesIds = this.selectedAirlinesIds;
    filterData.minPrice = this.minValue1;
    filterData.maxPrice = this.maxValue1;
    filterData.minLength = this.minValue2;
    filterData.maxLength = this.maxValue2;
    filterData.directCheckbox = this.directCheckbox;
    filterData.oneCheckbox = this.oneCheckbox;
    filterData.twoPlusCheckbox = this.twoPlusCheckbox;

    this.change.emit(filterData);
  }

  directCheckboxChange(event, value: boolean) {
    event.stopPropagation();
    this.directCheckbox = value;
  }

  oneCheckboxChange(event, value: boolean) {
    event.stopPropagation();
    this.oneCheckbox = value;
  }

  twoPlusCheckboxChange(event, value: boolean) {
    event.stopPropagation();
    this.twoPlusCheckbox = value;
  }
}
