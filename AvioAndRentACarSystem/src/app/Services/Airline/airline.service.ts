import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Airline } from 'src/app/AirlineModel/airline';

@Injectable({
  providedIn: 'root'
})
export class AirlineService extends DataService{
  airlines: Airline[];

  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'Airlines', http)

    this.getAll().subscribe(res => {
      this.airlines = res as Airline[];
    })
  }

  getAdminAirlinesAirline(adminAirlineId: number) {
    return this.httpClient.get(environment.serverUrl + 'Airlines/adminAirlinesId/' + adminAirlineId);
  }

  getAirlineReport(airlineId: number) {
    return this.httpClient.get(environment.serverUrl + 'Airlines/' + airlineId + '/report');
  }
}
