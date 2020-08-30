import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportService extends DataService{

  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'Airports', http)
  }
}
