import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../AirlineModel/flight';
import { Router } from '@angular/router';
import { ReservationService } from '../Services/Reservation/reservation.service';
import { LoginService } from '../Services/Login/login.service';
import { UserRole } from '../AirlineModel/userRole';

@Component({
  selector: 'flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  @Input() flights: Array<Flight>;

  constructor(private router: Router, 
              private reservationService: ReservationService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.flights.length; i++) {
      this.flights[i].takeoffTime = this.convertDate(this.flights[i].takeoffTime);
      this.flights[i].landingTime = this.convertDate(this.flights[i].landingTime);
    }
  }

  flightClick(id: number, cost: number) {
    this.reservationService.setSelectedFlightCost(cost);
    this.reservationService.setSelectedFlightId(id);
    this.router.navigate(['/' + id, 'seats']);
  }

  private convertDate(date: string): string {
    let byT: string[] = date.split("T");
    let fullDate: string[] = byT[0].split('-');
    let fullTime: string[] = byT[1].split(':');
    return fullDate[2] + "." + fullDate[1] + "." + fullDate[0] + "  " + fullTime[0] + ":" + fullTime[1];
  }
}
