import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/ModelRAC/car';
import { RACReport } from 'src/app/ModelRAC/HelperModelRAC/racReport';
import { RACService } from 'src/app/ModelRAC/racService';
import { Rent } from 'src/app/ModelRAC/rent';
import { CarService } from 'src/app/Services/Car/car.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { RacServiceService } from 'src/app/Services/RACService/rac-service.service';
import { RentService } from 'src/app/Services/Rent/rent.service';

@Component({
  selector: 'app-report-rac',
  templateUrl: './report-rac.component.html',
  styleUrls: ['./report-rac.component.css']
})
export class ReportRacComponent implements OnInit {

  tickets : Map<string, number>;
  earnings : Map<string, number>;
  interval : string;
  fullEarnings : number;
  fullEarningsAverage : number;
  rac: RACService;
  cars: Array<Car>;
  car: Car;
  racReport: RACReport;
  isLoaded: boolean = false;

  constructor(private rentService: RentService, private carService: CarService, private racServiceService: RacServiceService, private loginService: LoginService) {
    this.racReport = new RACReport();
    this.rac = new RACService();
    this.cars = new Array<Car>();
    this.car = new Car();
  }

  ngOnInit(): void {
    this.interval = "daily";
    this.tickets = new Map<string,number>();
    this.earnings = new Map<string, number>();
    this.racServiceService.getAdminRACServiceRACService(this.loginService.user.id).subscribe(res => {
      let rac = res as RACService;      
      this.racServiceService.getRACReport(rac.id).subscribe(res => {
        this.racReport = res as RACReport;
        console.log(this.racReport)
        let start: number = this.racReport.rentedCarsByDay.length - 360;
        for (let i = start; i < this.racReport.rentedCarsByDay.length; i++) {
          let val1 = this.racReport.rentedCarsByDay[i];
          let val2 = this.racReport.earningsByDay[i];
          this.tickets.set(val1.date, val1.value);
          this.earnings.set(val2.date, val2.value);
        }
        this.fullEarningsAverage = this.racReport.averageEarningsByDay;
        this.isLoaded = true;
      });
    });
  }

  dailyClick(){
    this.interval = "daily";
    this.tickets = new Map<string,number>();
    this.earnings = new Map<string, number>();
    let start: number = this.racReport.rentedCarsByDay.length - 360;
        for (let i = start; i < this.racReport.rentedCarsByDay.length; i++) {
          let val1 = this.racReport.rentedCarsByDay[i];
          let val2 = this.racReport.earningsByDay[i];
          this.tickets.set(val1.date, val1.value);
          this.earnings.set(val2.date, val2.value);
        }
        this.fullEarningsAverage = this.racReport.averageEarningsByDay;
        this.isLoaded = true;
  }

  weeklyClick(){ 
    this.interval = "weekly";
    this.tickets = new Map<string,number>();
    this.earnings = new Map<string, number>();   
    let start: number = this.racReport.rentedCarsByWeek.length - 51;
        for (let i = start; i < this.racReport.rentedCarsByWeek.length; i++) {
          let val1 = this.racReport.rentedCarsByWeek[i];
          let val2 = this.racReport.earningsByWeek[i];
          this.tickets.set(val1.date, val1.value);
          this.earnings.set(val2.date, val2.value);
        }
        this.fullEarningsAverage = this.racReport.averageEarningsByWeek;
        this.isLoaded = true;
  }

  monthlyClick(){
    this.interval = "monthly";
    this.tickets = new Map<string,number>();
    this.earnings = new Map<string, number>();   
    let start: number = this.racReport.rentedCarsByMonth.length - 12;
        for (let i = start; i < this.racReport.rentedCarsByMonth.length; i++) {
          let val1 = this.racReport.rentedCarsByMonth[i];
          let val2 = this.racReport.earningsByMonth[i];
          this.tickets.set(val1.date, val1.value);
          this.earnings.set(val2.date, val2.value);
        }
        this.fullEarningsAverage = this.racReport.averageEarningsByMonth;
        this.isLoaded = true;
  }
}
