import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  //set tickets dinamicaly on daily, weekly or monthly bases
  tickets : Map<string, number>;
  earnings : Map<string, number>;
  rate : number;
  interval : string;
  fullEarnings : number;

  constructor() { }

  ngOnInit(): void {
    this.rate = 8;
    this.interval = "weekly";
    this.fullEarnings = 1205600;
    this.tickets = new Map<string,number>();
    this.earnings = new Map<string, number>();

    let d1 = new Date(2020, 1, 1);
    let d2 = new Date(2020, 1, 2);
    let d3 = new Date(2020, 1, 3);
    let d4 = new Date(2020, 1, 4);

    this.tickets.set(this.createFullKey(d1), 100);
    this.tickets.set(this.createFullKey(d2), 300);
    this.tickets.set(this.createFullKey(d3), 200);
    this.tickets.set(this.createFullKey(d4), 140);

    this.earnings.set(this.createFullKey(d1), 1000);
    this.earnings.set(this.createFullKey(d2), 4000);
    this.earnings.set(this.createFullKey(d3), 7000);
    this.earnings.set(this.createFullKey(d4), 5000);
  }

  private createFullKey(date : Date){
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
  }
}
