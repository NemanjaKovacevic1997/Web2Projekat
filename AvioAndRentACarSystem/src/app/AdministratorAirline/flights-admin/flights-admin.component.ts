import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/AirlineModel/flight';
import { Router } from '@angular/router';

@Component({
  selector: 'flights-admin',
  templateUrl: './flights-admin.component.html',
  styleUrls: ['./flights-admin.component.css']
})
export class FlightsAdminComponent implements OnInit {
  @Input() flights: Array<Flight>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    for (let i = 0; i < this.flights.length; i++) {
      this.flights[i].takeoffTime = this.convertDate(this.flights[i].takeoffTime);
      this.flights[i].landingTime = this.convertDate(this.flights[i].landingTime);
    }
  }

  flightClick(flightId: number) {
    this.router.navigate(['/adminAirlines', flightId, 'remove']);
  }

  private convertDate(date: string): string {
    let byT: string[] = date.split("T");
    let fullDate: string[] = byT[0].split('-');
    let fullTime: string[] = byT[1].split(':');
    return fullDate[2] + "." + fullDate[1] + "." + fullDate[0] + "  " + fullTime[0] + ":" + fullTime[1];
  }

}
