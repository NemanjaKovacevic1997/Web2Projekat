import { Component, OnInit } from '@angular/core';
import { HistoryFlight } from '../AirlineModel/HelperModel/historyFlight';
import { LoginService } from '../Services/Login/login.service';
import { TicketService } from '../Services/Ticket/ticket.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historys: Array<HistoryFlight>
  constructor(private loginService: LoginService,
              private ticketService: TicketService) { }

  ngOnInit(): void {
    let id = this.loginService.user.id;
    this.ticketService.userFlightHistory(id).subscribe(res => {
      this.historys = res as Array<HistoryFlight>;
    });
  }

  drop(ticketId: number) {
    this.ticketService.remove(ticketId).subscribe(() => this.ngOnInit());
  }

  isAfter3HoursBeforeFlight(day: number, month: number, year: number, hour: number, minute: number): boolean {
    let now = new Date();
    var date = new Date(year, month - 1, day, hour, minute, 0);

    date.setHours(date.getHours() - 3);

    console.log("now :" +  now + " : " + now.getTime());
    console.log("date :" + date + " : " + date.getTime());

    if(now.getTime() >= date.getTime()){
      console.log("true");
      return false;
    }

    console.log("false");
    return true;

  }
}
