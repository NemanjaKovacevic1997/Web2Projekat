import { Component, OnInit } from '@angular/core';
import { Seat } from '../seats-map/seat';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  economyRows = 7;
  economyColumns = 5;
  economyBookedSeats : Array<Seat>;

  constructor() { }

  ngOnInit(): void {
    this.economyBookedSeats = new Array<Seat>();
    let s1 = new Seat(1,2);
    let s2 = new Seat(2,4);
    this.economyBookedSeats.push(s1,s2); 
  }

}
