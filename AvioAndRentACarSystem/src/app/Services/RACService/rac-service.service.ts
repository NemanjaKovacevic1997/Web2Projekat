import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RACService } from 'src/app/ModelRAC/racService';
import { environment } from 'src/environments/environment';
import { DataService } from '../Data/data.service';

@Injectable({
  providedIn: 'root'
})
export class RacServiceService extends DataService {
  racServices: RACService[];

  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.serverUrl + 'RACServices', http)

    this.getAll().subscribe(res => {
      this.racServices = res as RACService[];
    })
  }

  getAdminRACServiceRACService(adminRACServiceId: number) {
    return this.httpClient.get(environment.serverUrl + 'RACServices/adminRACServiceId/' + adminRACServiceId);
  }

  getRACReport(racId: number) {
    return this.httpClient.get(environment.serverUrl + 'RACServices/' + racId + '/racReport');
  }
}