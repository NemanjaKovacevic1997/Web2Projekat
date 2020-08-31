import { Component, OnInit, Input} from '@angular/core';
import { LoginService } from '../Services/Login/login.service';
import { UserRole } from '../AirlineModel/userRole';
import { Airport } from '../AirlineModel/airport';
import { Airline } from '../AirlineModel/airline';

@Component({
  selector: '[flight]',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

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
