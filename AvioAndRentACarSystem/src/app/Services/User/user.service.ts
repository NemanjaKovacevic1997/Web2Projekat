import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'Users', http)
  }

  getUserRoleUsers(userRole: number) {
    return this.httpClient.get(environment.serverUrl + 'Users/' + userRole + '/userRoleUsers');
  }
}
