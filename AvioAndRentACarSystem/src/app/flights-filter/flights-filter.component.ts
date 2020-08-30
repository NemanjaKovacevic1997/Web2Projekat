import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../AirlineModel/flight';
import { FlightService } from '../Services/Flights/flight.service';
import { ReservationService } from '../Services/Reservation/reservation.service';
import { FilterData } from '../AirlineModel/HelperModel/filterData';
import { cloneDeep } from 'lodash';
import { AirlineService } from '../Services/Airline/airline.service';
import { Airline } from '../AirlineModel/airline';


@Component({
  selector: 'flights-filter',
  templateUrl: './flights-filter.component.html',
  styleUrls: ['./flights-filter.component.css']
})


export class FlightsFilterComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private flightService: FlightService, private reservationService: ReservationService, private airlineService: AirlineService) { }

  flights: Array<Flight>;
  flightsAll: Array<Flight>;
  
  ngOnInit(): void {

    this.activeRoute.paramMap
                    .subscribe(params => {
                      let ret = params.get('airlineId');
                      
                      if(ret == "all") {
                        this.flightService.search(this.reservationService.searchData).subscribe(ret => {
                          this.flights = ret as Array<Flight>;
                          this.flightsAll = ret as Array<Flight>;
                        })
                      }
                      else {
                        let airlineId = +ret;
                        this.flightService.getAirlinesFlights(airlineId).subscribe(ret => {
                          this.flights = ret as Array<Flight>; 
                          this.flightsAll = ret as Array<Flight>;
                        })
                      }
                    })
  }

  fetchFilterData(filterData: FilterData) {
    let flightsAllCloned: Array<Flight> = [];
    for(let flight of this.flightsAll) {
      flightsAllCloned.push(flight);
    }
    
    var i = flightsAllCloned.length;
    while (i--) {
      let flight = flightsAllCloned[i];
      if(filterData.selectedAirlinesIds != undefined){
        if(!this.IsFlightAirlineContainedInSelected(filterData.selectedAirlinesIds, flight.airlineId)) {
          flightsAllCloned.splice(i, 1);
          continue;
        }
      }
      
      if(filterData.minPrice > flight.cost || filterData.maxPrice < flight.cost){
        flightsAllCloned.splice(i, 1);
        continue;
      }

      
      if(filterData.minLength * 60 > flight.duration || filterData.maxLength * 60 < flight.duration){
        flightsAllCloned.splice(i, 1);
        continue;
      }
      
      if(!filterData.directCheckbox && !filterData.oneCheckbox && !filterData.twoPlusCheckbox)
        continue;

      if(!filterData.directCheckbox) {
        if(flight.stopsLocations.length == 0){
          flightsAllCloned.splice(i, 1);
          continue;
        }
      }
      
      if(!filterData.oneCheckbox) {
        if(flight.stopsLocations.length == 1){
          flightsAllCloned.splice(i, 1);
          continue;
        }
      }

      if(!filterData.twoPlusCheckbox) {
        if(flight.stopsLocations.length >= 2){
          flightsAllCloned.splice(i, 1);
          continue;
        }
      }      
    }

    this.flights = flightsAllCloned;
  }

  private IsFlightAirlineContainedInSelected(selectedAirlinesIds: string[], flightsAirlineId: number) : boolean { 
    if(selectedAirlinesIds.length == 0)
      return true;
    for (let i = 0; i < selectedAirlinesIds.length; i++) {
      let id: number = +selectedAirlinesIds[i];
      if(id == flightsAirlineId){
        return true;
      }
    }
  }
}
