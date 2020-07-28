import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user = null;

  constructor(private http: HttpClient) { }

  login(username:string, password:string) {
    

             let params : HttpParams = new HttpParams();
             params.set('username', username);
             params.set('password', password);

             return this.http.get(environment.serverUrl + 'Login', { params: params })
                             .catch(this.handleError)
                             .subscribe(response => {
                              this.user = response.user;
                              localStorage.setItem('token', response.token);
                             })
                             
                                                          
             //localStorage.setItem('access_token', res.access_token);
    
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
