import { Component, OnInit } from '@angular/core';
import { Airline } from '../AirlineModel/airline';
import { AirlineService } from '../Services/Airline/airline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  airlines: Airline[];

  constructor(private airlineService: AirlineService, private router: Router) { }

  ngOnInit(): void {
    this.airlineService.getAll().subscribe(res => {
      this.airlines = res as Airline[];
    })
  }

  airlineClick(id: number) {
    this.router.navigate([id, 'flights']);
  }
}
