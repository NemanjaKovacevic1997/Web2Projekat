import { Injectable} from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService extends DataService{
  constructor(http: HttpClient){ 
    super(environment.serverUrl + 'RegisteredUsers', http)
  }
}
