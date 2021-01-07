import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService extends DataService {

  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.serverUrl + 'Cars', http)
   }

   getRACServiceCars(racServiceId: number) {
    return this.httpClient.get(environment.serverUrl + 'Cars/' + racServiceId + '/racServiceCars');
  }

  getQuickRentCars(year: number, month: number, day: number, location: string) {
    return this.httpClient.get(environment.serverUrl + 'Cars/quickRentCars/year=' + year + '&month=' + month + '&day=' + day + '&location=' + location);
  }
}


