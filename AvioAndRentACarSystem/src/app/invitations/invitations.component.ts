import { Component, OnInit } from '@angular/core';
import { Invitation } from '../AirlineModel/HelperModel/invitation';
import { LoginService } from '../Services/Login/login.service';
import { TicketService } from '../Services/Ticket/ticket.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  invitations: Array<Invitation>
  constructor(private loginService: LoginService,
              private ticketService: TicketService) { }

  ngOnInit(): void {
    let id = this.loginService.user.id;
    this.ticketService.userInvitations(id).subscribe(res => {
      this.invitations = res as Array<Invitation>;
    });
  }

  accept(id: number) {
    this.ticketService.acceptInvitation(id).subscribe(() => this.ngOnInit());
  }

  refuse(id: number) {
    this.ticketService.refuseInvitation(id).subscribe(() => this.ngOnInit());
  }

}
