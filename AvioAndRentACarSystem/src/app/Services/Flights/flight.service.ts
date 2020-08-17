import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { SerachData } from 'src/app/AirlineModel/HelperModel/searchData';

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

  search(searchData: SerachData) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8');

    
    return this.httpClient.post(environment.serverUrl + 'Flights/search', JSON.stringify(searchData), {headers: headers})
                          .pipe(catchError(error => error));
  }
}
