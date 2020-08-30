import { Component, OnInit } from '@angular/core';
import { RentACarService, Address, Coordinates, PriceList, XYZ, Branch } from './rent-a-car-service';

@Component({
  selector: 'rent-a-car-profile',
  templateUrl: './rent-a-car-profile.component.html',
  styleUrls: ['./rent-a-car-profile.component.css']
})
export class RentACarProfileComponent implements OnInit {
  airline : RentACarService = new RentACarService("Belgrade Rent-a-car",
  new Address("Belgrade", "Serbia", new Coordinates(44.81944444, 20.30694444)),
  "Just say where, we know how!",
  new PriceList(5, 12, 3, new XYZ(20, 10, 30)),"/assets/images/rentacar-beograd.png");

  constructor() { }

  ngOnInit(): void {
    this.airline.businessDestinations.push(new Branch("Nikola Tesla", new Address("Belgrade", "Serbia", new Coordinates(44.81944444, 20.30694444))));
    this.airline.businessDestinations.push(new Branch("P.P. Njegos", new Address("Podgorica", "Montenegro", new Coordinates(43.81944444, 19.30694444))));
    this.airline.businessDestinations.push(new Branch("Misa Tumbas", new Address("Zagreb", "Croatia", new Coordinates(43.81944444, 19.30694444))));
  }

}
