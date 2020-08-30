import { Injectable} from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService extends DataService{
  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'RegisteredUsers', http)
  }

  getUsersWithSenderStatus(id: number) {
    return this.httpClient.get(environment.serverUrl + 'RegisteredUsers/GetUsersWithSenderStatus/' + id);
                    //.pipe(catchError(error => error));
  }
  
  getFriends(id: number) {
    return this.httpClient.get(environment.serverUrl + 'RegisteredUsers/friends/' + id);
                    //.pipe(catchError(error => error));
  }

  getUsersByIds(ids: Array<number>) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8');
    return this.httpClient.post(environment.serverUrl + 'RegisteredUsers/usersBasedOnIds', JSON.stringify(ids), {headers: headers});
                   // .pipe(catchError(error => error));
  }
}
