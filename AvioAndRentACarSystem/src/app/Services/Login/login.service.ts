import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map, tap, shareReplay} from 'rxjs/operators';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { Router } from '@angular/router';
import { User } from 'src/app/AirlineModel/user';
import { Address } from 'src/app/AirlineModel/address';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User;
  userRole: UserRole;
  
  constructor(private http: HttpClient, private router: Router) {
    //let address = new Address(1, 'Novi Sad', 'Serbia');
    //this.user = new User('Nemanja', 'Kovacevic', 'kovacevicnemanja1997@gmail.com', address, '+9349145824812', 'kovac123', UserRole.Registered, 'kovac123');
    //this.user.id = 1;
    this.userRole = UserRole.Unregistered;
  }

  login(username:string, password:string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8');

    let body = JSON.stringify({
      "username": username,
      "password": password
    });

    let url = environment.serverUrl + 'Login';

    return this.http.post(url, body, {headers: headers})
                    .pipe(tap(res => this.setSession(res)), shareReplay(1));
  }

  private setSession(authResult) {
    this.user = authResult.user;
    this.userRole = UserRole[UserRole[authResult.user.role]];
    localStorage.setItem('token', authResult.token);
  }

  logout() {
    this.user = null;
    this.userRole = UserRole.Unregistered;
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }


  private handleError(error: Response) {
    if(error.status === 401)
      return Observable.throw('Unauthorized');  
  }
}
