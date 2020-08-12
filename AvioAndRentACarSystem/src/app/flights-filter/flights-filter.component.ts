import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../AirlineModel/flight';
import { FlightService } from '../Services/Flights/flight.service';


@Component({
  selector: 'flights-filter',
  templateUrl: './flights-filter.component.html',
  styleUrls: ['./flights-filter.component.css']
})


export class FlightsFilterComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private flightService: FlightService) { }

  flights: Array<Flight>;
  
  ngOnInit(): void {
    this.activeRoute.paramMap
                    .subscribe(params => {
                      let ret = params.get('airlineId');
                      
                      if(ret == "all") {
                        this.flightService.getAll().subscribe(ret => {
                          this.flights = ret as Array<Flight>;
                        })
                      }
                      else {
                        let airlineId = +ret;
                        this.flightService.getAirlinesFlights(airlineId).subscribe(ret => {
                          this.flights = ret as Array<Flight>;
                        })
                      }
                    })
  }

}
