import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Flight } from 'src/app/AirlineModel/flight';
import { Ticket } from 'src/app/AirlineModel/ticket';
import { Car } from 'src/app/ModelRAC/car';
import { RACAddress } from 'src/app/ModelRAC/racAddress';
import { Rent } from 'src/app/ModelRAC/rent';
import { CarService } from 'src/app/Services/Car/car.service';
import { FlightService } from 'src/app/Services/Flights/flight.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { RacAddressService } from 'src/app/Services/RACAddress/rac-address.service';
import { RentService } from 'src/app/Services/Rent/rent.service';
import { TicketService } from 'src/app/Services/Ticket/ticket.service';

@Component({
  selector: 'app-quick-rent-user-modal',
  templateUrl: './quick-rent-user-modal.component.html',
  styleUrls: ['./quick-rent-user-modal.component.css']
})
export class QuickRentUserModalComponent implements OnInit {

  @Input() public car;
  @Input() public ticketId;
  @Input() public location;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public ticket: Ticket;
  public cars: Array<Car>;
  public numberOfDays: number;
  public numberOfUsers: number;
  public priceListForOne: number;
  public priceListForTwo: number;
  public priceListForThree: number;
  public priceListForFour: number;
  public priceListForMore: number;
  public priceForNumberOfUsers: number;

  constructor(
    public activeModal: NgbActiveModal,
    private rentService: RentService,
    private ticketService: TicketService,
    private loginService: LoginService,
    private flightService: FlightService,
    private carService: CarService,
    private racAddressService: RacAddressService
  ) { }

  ngOnInit() {
    this.numberOfDays = 1;
    this.numberOfUsers = 1;
    this.getCars();
  }

  getCars(){
    this.cars = new Array<Car>();
    this.ticketService.get(this.ticketId).subscribe(ret => {
      this.ticket = ret as Ticket;
      this.flightService.get(this.ticket.flightId).subscribe(ret => {
        let flight = ret as Flight;
        let date = new Date(flight.landingTime);
        this.carService.getQuickRentCars(date.getFullYear(), date.getMonth()+1, date.getDate(), this.location).subscribe(ret => {
          this.cars  = ret as Array<Car>;
        });
      });
    });
  }

  getPricelist(car: Car){
    if(car.racService.priceList != ""){
      let stringParts = car.racService.priceList.split(" ");
      let one = stringParts[3].split("€");
      this.priceListForOne = Number.parseInt(one[0]);
      let two = stringParts[6].split("€");
      this.priceListForTwo = Number.parseInt(two[0]);
      let three = stringParts[9].split("€");
      this.priceListForThree = Number.parseInt(three[0]);
      let four = stringParts[12].split("€");
      this.priceListForFour = Number.parseInt(four[0]);
      let more = stringParts[15].split("€");
      this.priceListForMore = Number.parseInt(more[0]);
    }else{
      this.priceListForOne = 0;
      this.priceListForTwo = 0;
      this.priceListForThree = 0;
      this.priceListForFour = 0;
      this.priceListForMore = 0;
    }
    
    if(this.numberOfUsers == 1)
      this.priceForNumberOfUsers = this.priceListForOne;
    else if(this.numberOfUsers == 2)
      this.priceForNumberOfUsers = this.priceListForTwo;
    else if(this.numberOfUsers == 3)
      this.priceForNumberOfUsers = this.priceListForThree;
    else if(this.numberOfUsers == 4)
      this.priceForNumberOfUsers = this.priceListForFour;
    else
      this.priceForNumberOfUsers = this.priceListForMore;
  }

  validation(): boolean{
    let valid = true;

    if(this.numberOfDays <= 0 || this.numberOfDays >= 1000)
      valid = false

    return valid;
  }

  passBack(car: Car) {
    if(this.validation()){
      if (confirm('Are you sure you want to rent this car?')){
        let newRent = new Rent();
        newRent.numberOfUsers = this.numberOfUsers;
        this.getPricelist(car);
        newRent.price = (car.dailyPrice * this.numberOfDays) - (car.dailyPrice * this.numberOfDays * car.quickRentDiscount / 100) + this.priceForNumberOfUsers;
        newRent.ratingForCar = 0;
        newRent.ratingForRACService = 0;
        newRent.registeredUserId = this.loginService.user.id;
        newRent.startDate = new Date(car.quickRentDate);
        let date = new Date();
        date.setDate(newRent.startDate.getDate() + this.numberOfDays);
        newRent.endDate = date;
        this.racAddressService.getRACServiceMainAddress(car.racService.id).subscribe(ret => {
          let address = ret as RACAddress;
          newRent.startRACAddressId = address.id;
          newRent.endRACAddressId = address.id;
          newRent.carId = car.id;
          this.rentService.add(newRent).subscribe(ret => {
            let rent = ret as Rent;
            this.ticket.rentId = rent.id;
            this.ticketService.update(this.ticket.id, this.ticket).subscribe(() => {
              let updatedCar = new Car();
              updatedCar.id = car.id;
              updatedCar.image = car.image;
              updatedCar.mark = car.mark;
              updatedCar.model = car.model;
              updatedCar.seats = car.seats;
              updatedCar.type = car.type;
              updatedCar.year = car.year;
              updatedCar.rating = car.rating;
              updatedCar.dailyPrice = car.dailyPrice;
              updatedCar.isReservedForRent = car.isReservedForRent;
              updatedCar.quickRentDate = new Date(car.quickRentDate);
              updatedCar.quickRentDiscount = car.quickRentDiscount;
              updatedCar.quickRented = car.quickRented;
              updatedCar.racServiceId = car.racService.id;
              updatedCar.rented = car.rented;
              this.car = updatedCar;
              this.car.isReservedForRent = true;
              this.carService.update(this.car.id, this.car).subscribe(() => {console.log(this.car)});
              this.passEntry.emit(this.car);
              this.activeModal.close(this.ticket);
              this.activeModal.close(this.car);
            });
          }, (error:HttpErrorResponse) => {
            alert(error.error);
          });
        });
      }
    }
    else
      alert("Bad input.")
  }
}