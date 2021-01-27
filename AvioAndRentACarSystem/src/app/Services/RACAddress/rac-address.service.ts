import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from '../Data/data.service';

@Injectable({
  providedIn: 'root'
})

export class RacAddressService extends DataService {

  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.serverUrl + 'RACAddresses', http)
  }

  getRACServiceAddresses(racServiceId: number) {
    return this.httpClient.get(environment.serverUrl + 'RACAddresses/' + racServiceId + '/racServiceAddresses');
  }

  getRACServiceMainAddresses(racServiceId: number) {
    return this.httpClient.get(environment.serverUrl + 'RACAddresses/' + racServiceId + '/racServiceMainAddresses');
  }

  getRACServiceMainAddress(racServiceId: number) {
    return this.httpClient.get(environment.serverUrl + 'RACAddresses/' + racServiceId + '/racServiceMainAddress');
  }

  getAddressesForSearch(racServiceId: number) {
    return this.httpClient.get(environment.serverUrl + 'RACAddresses/' + racServiceId + '/addressesForSearch');
  }
}