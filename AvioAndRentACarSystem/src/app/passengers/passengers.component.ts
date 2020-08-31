import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../Services/Reservation/reservation.service';
import { RegisteredUserService } from '../Services/RegisteredUser/registeredUser.service';
import { UserWithoutCredentials } from '../AirlineModel/HelperModel/userWithoutCredentials';
import { Seat } from '../AirlineModel/seat';
import { Router } from '@angular/router';
import { LoginService } from '../Services/Login/login.service';
import { isNumeric } from 'rxjs/util/isNumeric'
import { Ticket } from '../AirlineModel/ticket';
import { EmailService } from '../Services/Email/email.service';
import { TicketService } from '../Services/Ticket/ticket.service';
import { HistoryFlight } from '../AirlineModel/HelperModel/historyFlight';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  knownPassengers: Array<UserWithoutCredentials>;
  usersInformation: Array<{id: number, firstName: string, lastName: string, passportNumber: string, seat: string, row: number, column: number, class: string}>;
  seats: Array<Seat>;

  constructor(private reservationService: ReservationService,
     private registeredUserService: RegisteredUserService,
     private loginService: LoginService,
     private emailService: EmailService,
     private ticketService: TicketService,
     private router: Router) { }
  
  ngOnInit(): void {
    this.usersInformation = [];
    this.seats = this.reservationService.bookedSeats;
    
    let ids: Array<number> = [];
    ids.push(this.loginService.user.id);
    for(let id of this.reservationService.invitedFriendsIds) {
      ids.push(id);
    }

    this.registeredUserService.getUsersByIds(ids).subscribe(res => {
      this.knownPassengers = res as Array<UserWithoutCredentials>;

      for (let i = 0; i < this.seats.length; i++) {
        if(i < this.knownPassengers.length) {
          let passenger = this.knownPassengers[i];
          if(passenger != null){
            this.usersInformation.push({id: passenger.id, firstName: passenger.firstName, lastName: passenger.lastName,
                                        passportNumber: '', seat: this.getSeatConcatenated(this.seats[i]), 
                                        row: this.seats[i].row, column: this.seats[i].column, class: this.seats[i].class });
          }
          else{
            this.usersInformation.push({id: passenger.id, firstName: '', lastName: '',
                                        passportNumber: '', seat: this.getSeatConcatenated(this.seats[i]),
                                        row: this.seats[i].row, column: this.seats[i].column, class: this.seats[i].class});
          } 
        }
        else{
          this.usersInformation.push({id: i + 302, firstName: '', lastName: '', 
                                      passportNumber: '', seat: this.getSeatConcatenated(this.seats[i]),
                                      row: this.seats[i].row, column: this.seats[i].column, class: this.seats[i].class});
        } 
      }      
    })
  }

  getSeatConcatenated(seat: Seat) {
    return seat.row.toString() + seat.column.toString();
  }

  finish() {
    if(!confirm("Are you sure you want to create reservation ?"))
      return;

    if(!this.validate()) {
      alert("Error.");
      return;
    }

    let tickets: Array<Ticket> = [];
    for(let userInfo of this.usersInformation) {
      let ticket = new Ticket();
      ticket.id = 0;
      ticket.flightId = this.reservationService.selectedFlightId;
      ticket.column = userInfo.column;
      ticket.row = userInfo.row;
      ticket.seat = new Seat(userInfo.row, userInfo.column, userInfo.class);
      ticket.cost = -1; //for now
      ticket.discount = -1; //for now
      ticket.isAccepted = false;
      ticket.passportNumber = userInfo.passportNumber;
      ticket.creatorId = this.loginService.user.id;
      
      if(userInfo.id >= 301) {
        ticket.userId = null;
        ticket.firstName = userInfo.firstName;
        ticket.lastName = userInfo.lastName; 
      }
      else {
        ticket.userId = userInfo.id;
        ticket.firstName = null;
        ticket.lastName = null; 
      }

      tickets.push(ticket);
    }

    this.ticketService.postTickets(this.loginService.user.id, tickets).subscribe(() => {
      this.emailService.sendEmails(this.loginService.user.id, this.reservationService.invitedFriendsIds).subscribe(() => {
        this.reservationService.resetReservationData();
        alert("Success! Please confrim your reservation in Invitaions.");
        this.router.navigate(['/home']);
      });
    });

  }

  private validate(): boolean {
    for(let u of this.usersInformation) {
      console.log(u.id + ", " + u.firstName + ", " + u.lastName + ", " + u.passportNumber + ", " + u.seat);

      if(u.firstName.trim() == ""){
        this.message();
        return false;
      }

      if(u.lastName.trim() == ""){
        this.message();
        return false;
      }

      if(u.passportNumber.trim() == "" || !isNumeric(u.passportNumber)){
        this.message();
        return false;
      }
    }

    if(!this.checkUniqnessOfSelectedSeats()) {
      alert("Seats must be unique for every passenger.");
      return false;
    }

    return true;
  }
  private message() {
    alert("All fields must be filled and passport must be number.");
  }

  private checkUniqnessOfSelectedSeats() : boolean{
    for (let i = 0; i < this.usersInformation.length; i++) {
      for (let j = i + 1; j < this.usersInformation.length; j++) {
        if(this.usersInformation[i].seat == this.usersInformation[j].seat){
          return false;
        }
      }
    }

    return true;
  }

  cancel() {
    if(confirm("Are you sure you want to go cancel. All reservation data will be lost.")){
      this.reservationService.resetReservationData();
      this.router.navigate(['/airlines']);
    }
  }
}
