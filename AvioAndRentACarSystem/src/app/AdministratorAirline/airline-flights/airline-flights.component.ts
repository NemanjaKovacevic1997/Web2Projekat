import { Component, OnInit } from '@angular/core';
import { FlightAdd } from 'src/app/AirlineModel/HelperModel/flightAdd';
import { AirlineService } from 'src/app/Services/Airline/airline.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { Airline } from 'src/app/AirlineModel/airline';
import { Flight } from 'src/app/AirlineModel/flight';
import { FlightService } from 'src/app/Services/Flights/flight.service';
import { FlightAirport } from 'src/app/AirlineModel/flightAirport';
import { FlightToSend } from 'src/app/AirlineModel/HelperModel/flightToSend';


@Component({
  selector: 'airline-flights',
  templateUrl: './airline-flights.component.html',
  styleUrls: ['./airline-flights.component.css']
})
export class AirlineFlightsComponent implements OnInit {
  flights: Array<Flight>;
  airline: Airline;

  constructor(private airlineService: AirlineService,
    private loginService: LoginService, 
    private flightService: FlightService) { }

  ngOnInit(): void {
    this.flights = [];
    this.airlineService.getAdminAirlinesAirline(this.loginService.user.id).subscribe(ret => {
      this.airline = ret as Airline;
      this.getAirlineFlights();
    });
  }

  addFlight(flightAdd: FlightAdd) {
    let flight: FlightToSend = new FlightToSend();
    flight.fromId = +flightAdd.from;
    flight.toId = +flightAdd.to;
    flight.takeoffYear = flightAdd.depart.year;
    flight.takeoffMonth = flightAdd.depart.month;
    flight.takeoffDay = flightAdd.depart.day;
    flight.takeoffHours = flightAdd.departTime.hour;
    flight.takeoffMinutes = flightAdd.departTime.minute;
    flight.landingYear = flightAdd.land.year;
    flight.landingMonth = flightAdd.land.month;
    flight.landingDay = flightAdd.land.day;
    flight.landingHours = flightAdd.landTime.hour;
    flight.landingMinutes = flightAdd.landTime.minute;
    flight.length = flightAdd.distance;
    flight.cost = flightAdd.cost;
    flight.airlineId = this.airline.id;
    flight.stopsLocationsIds = flightAdd.stopDestinations;

    this.flightService.add(flight).subscribe(() => this.getAirlineFlights());
  }

  private getAirlineFlights() {
    this.flightService.getAirlinesFlights(this.airline.id).subscribe(ret => {
      this.flights = ret as Array<Flight>; 
    });
  }
}
