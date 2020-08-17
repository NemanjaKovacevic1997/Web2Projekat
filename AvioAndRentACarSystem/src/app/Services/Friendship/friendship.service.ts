import { Injectable } from '@angular/core';
import { DataService } from '../Data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService extends DataService{
  constructor(http: HttpClient, private httpClient: HttpClient){ 
    super(environment.serverUrl + 'Friendships', http)
  }

  deleteFrendship(user1Id: number, user2Id: number) {
    return this.httpClient.delete(environment.serverUrl + 'Friendships/' + user1Id + '/' + user2Id)
                    .pipe(catchError(error => error));
  }
}
