import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(@Inject(String) private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
                    .pipe(catchError(error => this.handleError));
  }

  get(id) {
    return this.http.get(this.url + "/" + id)
                    .pipe(catchError(error => this.handleError));
  }

  add(data) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8');
    return this.http.post(this.url, JSON.stringify(data), {headers: headers})
                    .pipe(catchError(error => this.handleError));
      
  }

  update(id, data) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8');
    return this.http.put(this.url + "/" + id, JSON.stringify(data), {headers: headers})
                    .pipe(catchError(error => this.handleError)); 
  }

  remove(id) {
    return this.http.delete(this.url + "/" + id)
                    .pipe(catchError(error => this.handleError));
  }

  private handleError(error) {

  }
}
