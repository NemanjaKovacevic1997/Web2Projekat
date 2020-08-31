import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Seat } from 'src/app/AirlineModel/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatService extends DataService{
  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'Seats', http)
  }

  postRemovedSeats(flightId: number, seats: Array<Seat>) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8');
    return this.httpClient.post(environment.serverUrl + 'Seats/flight/' + flightId + '/remove', JSON.stringify(seats), {headers: headers});
  }
}
