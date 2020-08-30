import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { Airport } from 'src/app/AirlineModel/airport';
import { Airline } from 'src/app/AirlineModel/airline';

@Component({
  selector: '[flight-admin]',
  templateUrl: './flight-admin.component.html',
  styleUrls: ['./flight-admin.component.css']
})
export class FlightAdminComponent implements OnInit {
  @Input() from: Airport;
  @Input() to: Airport;
  @Input() takeoffTime: string;
  @Input() landingTime: string;
  @Input() duration: number;
  @Input() length: number;
  @Input() cost: number;
  @Input() averageRating: number;
  @Input() airline: Airline;
  @Input() stopsLocations: Array<any>;

  get UserRole() { return UserRole; }


  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    
  }

}
