import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from '../Data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAirlinesUserService extends DataService {

  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.serverUrl + 'AdminAirlinesUsers', http)
   }

   getAdminAirlinesUserById(adminAirlinesServiceId: number) {
    return this.httpClient.get(environment.serverUrl + 'AdminAirlinesUsers/getAdminAirlinesUserById/' + adminAirlinesServiceId);
  }
}
