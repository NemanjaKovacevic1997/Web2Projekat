import { Component, OnInit } from '@angular/core';
import { HistoryFlight } from '../AirlineModel/HelperModel/historyFlight';
import { Car } from '../ModelRAC/car';
import { RACAddress } from '../ModelRAC/racAddress';
import { RACService } from '../ModelRAC/racService';
import { Rent } from '../ModelRAC/rent';
import { CarService } from '../Services/Car/car.service';
import { LoginService } from '../Services/Login/login.service';
import { RacAddressService } from '../Services/RACAddress/rac-address.service';
import { RacServiceService } from '../Services/RACService/rac-service.service';
import { RentService } from '../Services/Rent/rent.service';
import { TicketService } from '../Services/Ticket/ticket.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historys: Array<HistoryFlight>;
  rents: Array<Rent>;

  constructor(private loginService: LoginService, private ticketService: TicketService, private rentService: RentService, private racAddressService: RacAddressService, private carService: CarService, private racService: RacServiceService) {
    this.rents = new Array<Rent>();
  }

  ngOnInit(): void {
    let id = this.loginService.user.id;
    this.ticketService.userFlightHistory(id).subscribe(res => {
      this.historys = res as Array<HistoryFlight>;
    });

    this.rentService.getAll().subscribe(ret => {
      var temp = ret as Array<Rent>;
      temp.forEach(element => {
        if(element.registeredUserId == id){
          this.racAddressService.get(element.startRACAddressId).subscribe(res => {
            element.startRACAddress = res as RACAddress;
            this.racAddressService.get(element.endRACAddressId).subscribe(res => {
              element.endRACAddress = res as RACAddress;
              this.carService.get(element.carId).subscribe(res => {
                element.car = res as Car;
                this.racService.get(element.car.racServiceId).subscribe(res => {
                  element.rac = res as RACService;
                  this.rents.push(element);
                });
              });
            });
          });
        }
      });
    });
  }

  dropRent(id: number) {
    this.rentService.remove(id).subscribe(() => this.ngOnInit());
  }

  is2DaysBeforeDelivery(startDate: Date): boolean {
    let now = new Date();
    let rentDate = new Date(startDate);
    //startDate.setHours(startDate.getDate() - 3);
    rentDate.setDate(rentDate.getDate() - 2);

    console.log("now :" +  now + " : " + now.getTime());
    console.log("date :" + rentDate + " : " + rentDate.getTime());

    if(now.getTime() >= rentDate.getTime()){
      console.log("true");
      return false;
    }

    console.log("false");
    return true;

  }

  drop(ticketId: number) {
    this.ticketService.remove(ticketId).subscribe(() => this.ngOnInit());
  }

  isAfter3HoursBeforeFlight(day: number, month: number, year: number, hour: number, minute: number): boolean {
    let now = new Date();
    var date = new Date(year, month - 1, day, hour, minute, 0);

    date.setHours(date.getHours() - 3);

    console.log("now :" +  now + " : " + now.getTime());
    console.log("date :" + date + " : " + date.getTime());

    if(now.getTime() >= date.getTime()){
      console.log("true");
      return false;
    }

    console.log("false");
    return true;

  }
}
