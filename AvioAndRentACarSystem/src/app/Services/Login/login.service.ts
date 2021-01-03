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
    let address = new Address(1, 'Novi Sad', 'Serbia');
    let id = localStorage.getItem('userId');
    let firstName = localStorage.getItem('userFirstName');
    let lastName = localStorage.getItem('userLastName');
    let role = localStorage.getItem('userRole');
    let username = localStorage.getItem('username');

    if(id == null || role == null){
      this.userRole = UserRole.Unregistered;
      this.user = null;
    }
    else {
      this.userRole = this.setUserRole(role);
      this.user = new User(firstName, lastName, '', '', '', this.userRole, username, address);
      this.user.id = +id;  
    }

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
    this.setUserProp(this.user);
  }

  logout() {
    this.user = null;
    this.userRole = UserRole.Unregistered;
    localStorage.removeItem('token');
    this.removeUserProp();
    this.router.navigate(['/sign-in']);
  }

  private setUserProp(user: User) {
    localStorage.setItem('userId', user.id.toString());
    localStorage.setItem('userFirstName', user.firstName);
    localStorage.setItem('userLastName', user.lastName);
    localStorage.setItem('userRole', user.role.toString());
    localStorage.setItem('username', user.username);
  }

  private removeUserProp() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  }

  private setUserRole(role: string) {
    if(role == '0') 
      return UserRole.Registered;
    if(role == '1')
      return UserRole.Unregistered;
    if(role == '2')
      return UserRole.AdminRAC;
    if(role == '3')
      return UserRole.AdminAirlines;
    if(role == '4')
      return UserRole.AdminSys;
  }
}
