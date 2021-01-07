import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from '../Data/data.service';

@Injectable({
  providedIn: 'root'
})
export class RentService extends DataService {

  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.serverUrl + 'Rents', http)
  }

  getRACRents(racId: number) {
    return this.httpClient.get(environment.serverUrl + 'Rents/' + racId + '/racRents');
  }

  getCarsRents(carId: number) {
    return this.httpClient.get(environment.serverUrl + 'Rents/' + carId + '/carsRents');
  }

  isAddressRented(addressId: number) {
    return this.httpClient.get(environment.serverUrl + 'Rents/' + addressId + '/addressRented');
  }

  isCarRented(carId: number) {
    return this.httpClient.get(environment.serverUrl + 'Rents/' + carId + '/carRented');
  }

  notRentedCarsInSomeDateRange(racId: number, year1: number, month1: number, day1:number, hour1:number, minute1:number, year2:number, month2:number, day2:number, hour2:number, minute2:number) {
    return this.httpClient.get(environment.serverUrl + 'Rents/notRentedCarsInSomeDateRange/racId=' + racId + '&year1=' + year1 + '&month1=' + month1 + '&day1=' + day1 + '&hour1=' + hour1 + '&minute1=' + minute1 + '&year2=' + year2 + '&month2=' + month2 + '&day2=' + day2 + '&hour2=' + hour2 + '&minute2=' + minute2);
  }

  notRentedServicesInSomeDateRange(year1: number, month1: number, day1:number, hour1:number, minute1:number, year2:number, month2:number, day2:number, hour2:number, minute2:number) {
    return this.httpClient.get(environment.serverUrl + 'Rents/notRentedServicesInSomeDateRange/year1=' + year1 + '&month1=' + month1 + '&day1=' + day1 + '&hour1=' + hour1 + '&minute1=' + minute1 + '&year2=' + year2 + '&month2=' + month2 + '&day2=' + day2 + '&hour2=' + hour2 + '&minute2=' + minute2);
  }

  deleteRentWithTicketId(ticketId: number) {
    return this.httpClient.delete(environment.serverUrl + 'Rents/' + ticketId + '/rentWithTicketId');
  }
}
