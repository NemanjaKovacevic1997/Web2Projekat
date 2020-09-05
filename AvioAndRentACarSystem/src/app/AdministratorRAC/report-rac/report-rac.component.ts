import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-rac',
  templateUrl: './report-rac.component.html',
  styleUrls: ['./report-rac.component.css']
})
export class ReportRacComponent implements OnInit {

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
    let d5 = new Date(2020, 1, 5);
    let d6 = new Date(2020, 1, 6);
    let d7 = new Date(2020, 1, 7);
    let d8 = new Date(2020, 1, 8);
    let d9 = new Date(2020, 1, 9);
    let d10 = new Date(2020, 1, 10);

    this.tickets.set(this.createFullKey(d1), 100);
    this.tickets.set(this.createFullKey(d2), 300);
    this.tickets.set(this.createFullKey(d3), 200);
    this.tickets.set(this.createFullKey(d4), 140);
    this.tickets.set(this.createFullKey(d5), 110);
    this.tickets.set(this.createFullKey(d6), 170);
    this.tickets.set(this.createFullKey(d7), 350);
    this.tickets.set(this.createFullKey(d8), 240);
    this.tickets.set(this.createFullKey(d9), 140);
    this.tickets.set(this.createFullKey(d10), 240);

    this.earnings.set(this.createFullKey(d1), 1000);
    this.earnings.set(this.createFullKey(d2), 4000);
    this.earnings.set(this.createFullKey(d3), 7000);
    this.earnings.set(this.createFullKey(d4), 2000);
    this.earnings.set(this.createFullKey(d5), 3000);
    this.earnings.set(this.createFullKey(d6), 2000);
    this.earnings.set(this.createFullKey(d7), 6000);
    this.earnings.set(this.createFullKey(d8), 4000);
    this.earnings.set(this.createFullKey(d9), 2000);
    this.earnings.set(this.createFullKey(d10), 1000);
  }

  private createFullKey(date : Date){
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
  }
}
