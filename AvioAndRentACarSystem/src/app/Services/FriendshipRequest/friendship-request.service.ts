import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendshipRequestService extends DataService{
  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'FrendshipRequests', http)
  }

  deleteFrendshipRequestByIds(fromId: number, toId: number) {
    return this.httpClient.delete(environment.serverUrl + 'FrendshipRequests/' + fromId + '/' + toId)
                    .pipe(catchError(error => error));
  }

  acceptRequest(fromId: number, toId: number) {
    return this.httpClient.get(environment.serverUrl + 'FrendshipRequests/accept/' + fromId + '/' + toId)
                    .pipe(catchError(error => error));
  }

  refuseRequest(fromId: number, toId: number) {
    return this.httpClient.get(environment.serverUrl + 'FrendshipRequests/refuse/' + fromId + '/' + toId)
                    .pipe(catchError(error => error));
  }
}
