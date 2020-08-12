import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../AirlineModel/flight';

@Component({
  selector: 'flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  //f1 : Flight = new Flight(3, 15, 6, 24, 'Belgrade', 'Budapest', 1, 'JAT', 100);
  //f2 : Flight = new Flight(4, 15, 7, 24, 'Nis', 'Budapest', 2, 'TA', 200);
  //f3 : Flight = new Flight(2, 15, 5, 24, 'Zagreb', 'Sarajevo', 1, 'AT', 400);

  @Input() flights: Array<Flight>;

  constructor() { }

  ngOnInit(): void {
    //this.flights = [this.f1, this.f2, this.f3];
  }

}
