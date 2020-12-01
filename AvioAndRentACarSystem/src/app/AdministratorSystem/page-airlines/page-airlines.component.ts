import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/AirlineModel/airline';
import { AirlineService } from 'src/app/Services/Airline/airline.service';

@Component({
  selector: 'app-page-airlines',
  templateUrl: './page-airlines.component.html',
  styleUrls: ['./page-airlines.component.css']
})
export class PageAirlinesComponent implements OnInit {

  airlines: Airline[];

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airlineService.getAll().subscribe(res => {
      this.airlines = res as Airline[];
    })
  }

}
