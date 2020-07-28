import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user = null;

  constructor(private http: Http) { }

  login(email:string, password:string) {
    this.http.get(environment.serverUrl + 'Login')
             .catch(this.handleError)
             .subscribe(response => { 
                let responseJson = response.json();
                this.user = responseJson.user;
                localStorage.setItem('token', responseJson.token);
             });
    
  }

  logout() {
    this.user = null;
    localStorage.removeItem('token');
  }


  private handleError(error: Response) {
    if(error.status === 401)
      return Observable.throw('Unauthorized');  
  }
}
