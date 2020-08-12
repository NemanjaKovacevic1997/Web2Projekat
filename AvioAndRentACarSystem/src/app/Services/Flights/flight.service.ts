import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightService extends DataService{
  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'Flights', http)
  }

  getAirlinesFlights(id: number) {
    return this.httpClient.get(environment.serverUrl + 'Flights/airlineFlights/' + id)
                    .pipe(catchError(error => error));
  }
}
