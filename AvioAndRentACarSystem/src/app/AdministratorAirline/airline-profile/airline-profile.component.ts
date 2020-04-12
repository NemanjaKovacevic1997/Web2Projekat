import { Component, OnInit } from '@angular/core';
import { Airline, Address, Coordinates, Measurement, PriceList, XYZ, Airport } from './airline';
import { environment } from 'src/environments/environment';
declare var require: any;

@Component({
  selector: 'app-airline-profile',
  templateUrl: './airline-profile.component.html',
  styleUrls: ['./airline-profile.component.css']
})
export class AirlineProfileComponent implements OnInit {
  airline : Airline = new Airline("MyAirline",
                                  new Address("Belgrade", "Serbia", new Coordinates(44.81944444, 20.30694444)),
                                  "Always with you",
                                  new PriceList(5, 12, 3, new XYZ(20, 10, 30)));
  
  
                           
  constructor() { }

  ngOnInit(): void {
    this.airline.businessDestinations.push(new Airport("Nikola Tesla", new Address("Belgrade", "Serbia", new Coordinates(44.81944444, 20.30694444))));
    this.airline.businessDestinations.push(new Airport("P.P. Njegos", new Address("Podgorica", "Montenegro", new Coordinates(43.81944444, 19.30694444))));
    this.airline.businessDestinations.push(new Airport("Misa Tumbas", new Address("Zagreb", "Croatia", new Coordinates(43.81944444, 19.30694444))));
  }

}
