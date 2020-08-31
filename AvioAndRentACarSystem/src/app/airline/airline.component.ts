import { Component, OnInit } from '@angular/core';
import { Airline } from '../AirlineModel/airline';
import { Address } from '../AirlineModel/address';
import { PriceList } from '../AirlineModel/priceList';
import { XYZ } from '../AdministratorAirline/airline-profile/airline';
import { Airport } from '../AirlineModel/airport';
import { AirlineService } from '../Services/Airline/airline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineAirport } from '../AirlineModel/airlineAirport';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
  airline: Airline;
  airlineId: number;
  businessDestinations: Array<AirlineAirport>;
  isLoaded: boolean = false;

  constructor(private airlineService: AirlineService,
     private activeRoute: ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap
    .subscribe(params => {
      this.airlineId = +params.get('id');
      this.airlineService.get(this.airlineId).subscribe(ret => {
        this.airline = ret as Airline;

        this.airlineService.getBusinessDestinations(this.airline.id).subscribe(ret => {
          this.businessDestinations = ret as Array<AirlineAirport>;
          console.log(this.businessDestinations);
        });
       
        this.isLoaded = true;
        console.log(this.airline);
      });
    });
  }

  fastTicketsClick() {
    this.router.navigate(['/' + this.airlineId, 'fastTickets']);
  }
}
