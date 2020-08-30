import { Component, OnInit } from '@angular/core';
import { Seat } from '../AirlineModel/seat';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatService } from '../Services/Seat/seat.service';
import { SeatsPerFlightProperties } from '../AirlineModel/HelperModel/seatsPerFlightProperties';
import { ReservationService } from '../Services/Reservation/reservation.service';
import { LoginService } from '../Services/Login/login.service';
import { userInfo } from 'os';
import { UserRole } from '../AirlineModel/userRole';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  seatsPerFlightProperties: SeatsPerFlightProperties;
  people: number;
  economyCost: number;
  businessIncrease: number;
  businessCost: number;
  firstIncrease: number;
  firstCost: number;

  constructor(private activeRoute: ActivatedRoute,
     private seatService: SeatService,
      private router: Router,
       private reservationService: ReservationService,
      private loginService: LoginService) { }

  ngOnInit(): void {
    //this.reservationService.setSelectedFlightCost(400);
    this.economyCost = this.reservationService.selectedFlightCost;
    this.businessIncrease = 10;
    this.firstIncrease = 25;
    this.businessCost = this.economyCost + this.economyCost * (this.businessIncrease / 100);
    this.firstCost = this.economyCost + this.economyCost * (this.firstIncrease / 100);

    /*this.seatsPerFlightProperties = new SeatsPerFlightProperties();
    this.seatsPerFlightProperties.rows = 20;
    this.seatsPerFlightProperties.columns = 9;
    this.seatsPerFlightProperties.buisinessClassEndRow = 9;
    this.seatsPerFlightProperties.firstClassEndRow = 3;
    this.seatsPerFlightProperties.bookedSeats = new Array<Seat>();
    let s1 = new Seat(1,2, "First");
    let s2 = new Seat(2,4, "First");
    this.seatsPerFlightProperties.bookedSeats.push(s1, s2);
    this.seatsPerFlightProperties.removedSeats = new Array<Seat>();
    this.reservationService.setSelectedFlightId(1);*/

    this.people = this.reservationService.searchData.people;

    //this.people = 3;
    this.activeRoute.paramMap
                    .subscribe(params => {
                      let id = +params.get('flightId');
                      this.reservationService.setSelectedFlightId(id);

                      //get seats of that flight
                      this.seatService.get(id).subscribe(ret => {
                        let spfp = ret as SeatsPerFlightProperties;
                        this.seatsPerFlightProperties = new SeatsPerFlightProperties();
                        this.seatsPerFlightProperties.rows = spfp.rows;
                        this.seatsPerFlightProperties.columns = spfp.columns;
                        this.seatsPerFlightProperties.firstClassEndRow = spfp.firstClassEndRow;
                        this.seatsPerFlightProperties.buisinessClassEndRow = spfp.buisinessClassEndRow;
                        this.seatsPerFlightProperties.bookedSeats = spfp.bookedSeats;
                        this.seatsPerFlightProperties.removedSeats = spfp.removedSeats;
                      })
                    })
  }

  recieveSeatChanges(myBooking: Array<Seat>) {
    this.reservationService.setBookedSeats(myBooking);
  }

  next() {
    if(this.loginService.userRole != UserRole.Registered) {
      alert("Please login or register if you want to continue.");
      return;
    }
    
    let currentBookedSeats: number = this.reservationService.bookedSeats.length;
    if(this.people != currentBookedSeats){
      alert("You must take exactly " + this.people + " seats.");
      return;
    }
    this.router.navigate(['/invite']);
  }

  back() {
    if(confirm("Are you sure you want to go back. All reservation data will be lost.")){
      this.router.navigate(['/airlines']);
      this.reservationService.resetReservationData();
    }
  }
}
