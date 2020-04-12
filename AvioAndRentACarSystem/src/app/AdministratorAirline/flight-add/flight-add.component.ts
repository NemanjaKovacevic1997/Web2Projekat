import { Component, OnInit } from '@angular/core';
import { Airport, Address, Coordinates } from '../airline-profile/airline';

@Component({
  selector: 'flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css']
})
export class FlightAddComponent implements OnInit {
  stopDestinations : Array<Airport>
  time = {hour: 0, minute: 0};
  minPickerDate;

  constructor() { }

  ngOnInit(): void {
    this.stopDestinations = new Array<Airport>();
    this.stopDestinations.push(new Airport('Airline1', new Address('City1', 'Country1', new Coordinates(-1, -1))));
    this.stopDestinations.push(new Airport('Airline2', new Address('City2', 'Country2', new Coordinates(-1, -1))));
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  }

}
