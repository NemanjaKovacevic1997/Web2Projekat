import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from '../Data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminSysUserService extends DataService {

  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.serverUrl + 'AdminSysUsers', http)
   }

   getAdminSysUserById(adminSysServiceId: number) {
    return this.httpClient.get(environment.serverUrl + 'AdminSysUsers/getAdminSysUserById/' + adminSysServiceId);
  }
}
