import { Component, OnInit } from '@angular/core';
import { HistoryFlight } from '../AirlineModel/HelperModel/historyFlight';
import { LoginService } from '../Services/Login/login.service';
import { TicketService } from '../Services/Ticket/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Invitation } from '../AirlineModel/HelperModel/invitation';

@Component({
  selector: 'app-fast-tickets',
  templateUrl: './fast-tickets.component.html',
  styleUrls: ['./fast-tickets.component.css']
})
export class FastTicketsComponent implements OnInit {

  fastTickets: Array<Invitation>;
  now;

  constructor(private loginService: LoginService,
              private ticketService: TicketService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.now = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    this.activeRoute.paramMap.subscribe(params => {
      let airlineId = +params.get('airlineId');
      this.ticketService.getFastTickets(airlineId).subscribe(res => {
        this.fastTickets = res as Array<Invitation>;
      });
    });
  }

  reserve(ticketId: number) {
    if(confirm("Are you shure you want to reserve this flight ?")) {
      let userId = this.loginService.user.id;
      this.ticketService.acceptFastTicket(ticketId, userId).subscribe(() => this.ngOnInit());
    }
  }

  

}
