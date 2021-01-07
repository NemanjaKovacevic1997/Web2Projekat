import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ticket } from 'src/app/AirlineModel/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends DataService{
  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'Tickets', http)
  }

  postTickets(userId: number, tickets: Array<Ticket>) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8');
    return this.httpClient.post(environment.serverUrl + 'Tickets/' + userId + '/postTickets', JSON.stringify(tickets), {headers: headers});
  }

  acceptInvitation(ticketId: number) {
    return this.httpClient.get(environment.serverUrl + 'Tickets/' + ticketId + '/accept');
  }

  refuseInvitation(ticketId: number) {
    return this.httpClient.get(environment.serverUrl + 'Tickets/' + ticketId + '/refuse');
  }

  userTickets(userId: number) {
    return this.httpClient.get(environment.serverUrl + 'Tickets/' + userId + '/tickets');
  }

  userInvitations(userId: number) {
    return this.httpClient.get(environment.serverUrl + 'Tickets/' + userId + '/invitations');
  }

  userFlightHistory(userId: number) {
    return this.httpClient.get(environment.serverUrl + 'Tickets/' + userId + '/historyOfFlights');
  }

  getFastTickets(airlineId: number){
    return this.httpClient.get(environment.serverUrl + 'Tickets/' + airlineId + '/fastTickets');
  }

  acceptFastTicket(ticketId: number, userId: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8');
    let body = JSON.stringify({
      "userId": userId,
    });
    return this.httpClient.post(environment.serverUrl + 'Tickets/' + ticketId + '/acceptFastTicket', body, {headers: headers});
  }

  ticketHasRent(rentId: number){
    return this.httpClient.get(environment.serverUrl + 'Tickets/' + rentId + '/hasRent');
  }
}
