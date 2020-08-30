import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Email } from 'src/app/AirlineModel/HelperModel/email';
import { environment } from 'src/environments/environment';
import { HistoryFlight } from 'src/app/AirlineModel/HelperModel/historyFlight';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(mailMessage: Email) {
    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');

    if (mailMessage) {
      headers = headers.set('Content-Type', 'application/json');
    }

    this.http.post(environment.serverUrl + 'Email/sendMail', mailMessage, {
      headers
    }).subscribe(result => {
      console.log("Email sent!");
    });
  }

  sendEmailToYourself(id: number, flightInfo: HistoryFlight) {
    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(environment.serverUrl + 'Email/' + id + '/sendMails', JSON.stringify(flightInfo), {
      headers
    });
  }

  sendEmails(idFrom: number, invitedFriendsIds: Array<number>) {
    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(environment.serverUrl + 'Email/' + idFrom + '/sendMails', invitedFriendsIds, {
      headers
    });
  }
}
