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
    this.economyCost = this.reservationService.selectedFlightCost;
    this.businessIncrease = 10;
    this.firstIncrease = 25;
    this.businessCost = this.economyCost + this.economyCost * (this.businessIncrease / 100);
    this.firstCost = this.economyCost + this.economyCost * (this.firstIncrease / 100);

    this.people = this.reservationService.searchData.people;

    this.activeRoute.paramMap
                    .subscribe(params => {
                      let id = +params.get('flightId');
                      this.reservationService.setSelectedFlightId(id);

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

  cancel() {
    if(confirm("Are you sure you want to go cancel. All reservation data will be lost.")){
      this.reservationService.resetReservationData();
      this.router.navigate(['/airlines']);
    }
  }
}
