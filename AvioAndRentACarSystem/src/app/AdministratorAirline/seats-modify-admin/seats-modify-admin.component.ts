import { Component, OnInit } from '@angular/core';
import { SeatsPerFlightProperties } from 'src/app/AirlineModel/HelperModel/seatsPerFlightProperties';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatService } from 'src/app/Services/Seat/seat.service';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { Seat } from 'src/app/AirlineModel/seat';

@Component({
  selector: 'app-seats-modify-admin',
  templateUrl: './seats-modify-admin.component.html',
  styleUrls: ['./seats-modify-admin.component.css']
})
export class SeatsModifyAdminComponent  implements OnInit {

  seatsPerFlightProperties: SeatsPerFlightProperties;
  flightId: number;
  seatsToRemove: Array<Seat>;

  constructor(private activeRoute: ActivatedRoute,
     private seatService: SeatService,
     ) { }

  ngOnInit(): void {
    this.seatsToRemove = [];
    this.activeRoute.paramMap
                    .subscribe(params => {
                      this.flightId = +params.get('flightId');            

                      this.seatService.get(this.flightId).subscribe(ret => {
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

  recieveSeatChanges(seatsToRemove: Array<Seat>) {
    this.seatsToRemove = seatsToRemove;
  }

  saveChanges() {
    this.seatService.postRemovedSeats(this.flightId, this.seatsToRemove).subscribe(() => alert("Success."));
  }
}
