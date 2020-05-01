import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: '[flight-admin]',
  templateUrl: './flight-admin.component.html',
  styleUrls: ['./flight-admin.component.css']
})
export class FlightAdminComponent implements OnInit {
  @Input('startTimeHours') startTimeHours : Number;
  @Input('startTimeMinutes') startTimeMinutes : Number;
  @Input('landTimeHours') landTimeHours : Number;
  @Input('landTimeMinutes') landTimeMinutes : Number;
  @Input('startDest') startDest : string;
  @Input('landDest') landDest : string;
  @Input('stops') stops : Number;
  @Input('airline') airline : string;
  @Input('cost') cost : Number;
  flightLenghtMinutes : Number;
  flightLengthHours : Number;
  userRole : string;


  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.flightLengthHours = 1;
    this.flightLenghtMinutes = 1;
    this.userRole = this.userService.loggedUserType;
  }

}
