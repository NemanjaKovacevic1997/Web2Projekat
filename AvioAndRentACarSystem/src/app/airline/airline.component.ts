import { Component, OnInit } from '@angular/core';
import { Airline } from '../AirlineModel/airline';
import { Address } from '../AirlineModel/address';
import { PriceList } from '../AirlineModel/priceList';
import { XYZ } from '../AdministratorAirline/airline-profile/airline';
import { Airport } from '../AirlineModel/airport';
import { AirlineService } from '../Services/Airline/airline.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
  airline: Airline;
  airlineId: number;
  constructor(private airlineService: AirlineService,
     private activeRoute: ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap
    .subscribe(params => {
      this.airlineId = +params.get('id');
      this.airlineService.get(this.airlineId).subscribe(ret => {
        this.airline = ret as Airline;
      })
    })
  }

  fastTicketsClick() {
    this.router.navigate(['/' + this.airlineId, 'fastTickets']);
  }
}
