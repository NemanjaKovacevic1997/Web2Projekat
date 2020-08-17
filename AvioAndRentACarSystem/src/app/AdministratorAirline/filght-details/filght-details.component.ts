import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/flight/flightClass';

@Component({
  selector: 'app-filght-details',
  templateUrl: './filght-details.component.html',
  styleUrls: ['./filght-details.component.css']
})
export class FilghtDetailsComponent implements OnInit {

  f1 : Flight = new Flight(3, 15, 6, 24, 'Belgrade', 'Budapest', 1, 'JAT', 100);
  
  constructor() { }

  ngOnInit(): void {
  }

}
