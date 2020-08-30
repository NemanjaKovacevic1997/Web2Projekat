import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/Services/Airline/airline.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { Airline } from 'src/app/AirlineModel/airline';
import { AirlineReport } from 'src/app/AirlineModel/HelperModel/airlineReport';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  airline: Airline;
  report: AirlineReport;
  tickets: Map<string, number>;
  earnings: Map<string, number>;
  rate: number;
  interval: string;
  fullEarnings: number;
  dayEarninng: number;
  weekEarninng: number;
  monthEarninng: number;

  isLoaded: boolean = false;
  constructor(private airlineService: AirlineService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.tickets = new Map<string,number>();
    this.earnings = new Map<string, number>();
    this.interval = 'weekly';
    
    this.airlineService.getAdminAirlinesAirline(this.loginService.user.id).subscribe(ret => {
      this.airline = ret as Airline;
      this.airlineService.getAirlineReport(this.airline.id).subscribe(ret => {
        this.report = ret as AirlineReport;
        this.rate = this.report.averageRating;
        this.convertAirlineReportToLocal(this.report);
        this.isLoaded = true;
      });
    });
  }

  dailyButtonClick() {
    this.interval = 'daily';
    this.convertAirlineReportToLocal(this.report);
    this.reload();
  }

  weeklyButtonClick() {
    this.interval = 'weekly';
    this.convertAirlineReportToLocal(this.report);
    this.reload();
  }

  monthlyButtonClick() {
    this.interval = 'monthly';
    this.convertAirlineReportToLocal(this.report);
    this.reload();
  }

  private convertAirlineReportToLocal(airlineReport: AirlineReport) {

    let offset: number = 7;
    if(this.interval == 'daily')
      offset = 1;
    if(this.interval == 'weekly')
      offset = 7;
    if(this.interval == 'monthly')
      offset = 30;

    this.tickets = new Map<string, number>();
    this.earnings = new Map<string, number>();
    this.fullEarnings = 0;
    let start: number = airlineReport.soldTicketsByMonth.length - offset;
    for (let i = start; i < airlineReport.soldTicketsByMonth.length; i++) {
      let val1 = airlineReport.soldTicketsByMonth[i];
      let val2 = airlineReport.earninngsByMonth[i];
      this.tickets.set(val1.date, val1.value);
      this.earnings.set(val2.date, val2.value);
      this.fullEarnings = this.fullEarnings + val2.value;
    }
  }

  private reload() {
    setTimeout(() => this.isLoaded = false);
    setTimeout(() => this.isLoaded = true);
  }
}
