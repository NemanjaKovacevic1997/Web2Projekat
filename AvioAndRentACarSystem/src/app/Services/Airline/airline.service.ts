import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirlineService extends DataService{
  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'Airlines', http)
  }
}
