import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from '../AirlineModel/userRole';
import { Car } from '../ModelRAC/car';
import { FilterDataRAC } from '../ModelRAC/HelperModelRAC/filterDataRAC';
import { RACService } from '../ModelRAC/racService';
import { CarService } from '../Services/Car/car.service';
import { LoginService } from '../Services/Login/login.service';
import { RacServiceService } from '../Services/RACService/rac-service.service';
import { RentService } from '../Services/Rent/rent.service';

@Component({
  selector: 'app-rent-a-car-selected',
  templateUrl: './rent-a-car-selected.component.html',
  styleUrls: ['./rent-a-car-selected.component.css']
})

export class RentACarSelectedComponent implements OnInit {
  public id: number;
  public rac: RACService;
  public loginService: LoginService;
  public cars: Array<Car>;
  public carsAll: Array<Car>; 
  public isLoaded: boolean;

  constructor(private racServiceService: RacServiceService, loginService: LoginService, private activatedRoute: ActivatedRoute, private carService: CarService, private rentService: RentService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });

    this.getRACServiceAndCars();
  }

  getRACService(){
    if(this.loginService.userRole == UserRole.AdminRAC){ 
      this.racServiceService.getAdminRACServiceRACService(this.loginService.user.id).subscribe(ret => { 
        this.rac = ret as RACService
      });
    }else{
      this.racServiceService.get(this.id).subscribe(ret => {
        this.rac = ret as RACService;
      });
    }
  }

  getRACServiceAndCars(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      this.racServiceService.getAdminRACServiceRACService(this.loginService.user.id).subscribe(ret => { 
        this.rac = ret as RACService
        this.getCars();
      });
    }else{
      this.racServiceService.get(this.id).subscribe(ret => {
        this.rac = ret as RACService;
        this.getCars();
      });
    }
  }

  getCars(){
    this.carService.getRACServiceCars(this.rac.id).subscribe( ret => {
      this.cars = ret as Array<Car>;
      this.carsAll = ret as Array<Car>;
      this.cars.forEach(car => {
        this.rentService.isCarRented(car.id).subscribe(ret => {
          car.isReservedForRent = ret as boolean;
        });
        this.isLoaded = true;
      });
    });
  }

  fetchFilterData(filterData: FilterDataRAC) {
    if(filterData.deliveryAddress != undefined){
      let carFiltered: Array<Car> = [];
      this.rentService.notRentedCarsInSomeDateRange(this.rac.id, filterData.date1Year,filterData.date1Month+1,filterData.date1Day,filterData.time1Hour-1,filterData.time1Minute, filterData.date2Year,filterData.date2Month+1,filterData.date2Day,filterData.time2Hour-1,filterData.time2Minute).subscribe(ret => {
        carFiltered = ret as Array<Car>;
        var i = carFiltered.length;
        while (i--) {
          let car = carFiltered[i];
          if(car.type != undefined){
            if(filterData.carType == "All"){
              if(car.dailyPrice > filterData.maxTotalPrice || car.dailyPrice < filterData.minTotalPrice || car.seats < filterData.numberOfPasengers){
                carFiltered.splice(i, 1);
                continue;   
              }
            }
            else{
              if(car.type != filterData.carType || car.dailyPrice > filterData.maxTotalPrice || car.dailyPrice < filterData.minTotalPrice || car.seats < filterData.numberOfPasengers){
                carFiltered.splice(i, 1);
                continue;   
              }
            } 
          }
        }
        this.cars = carFiltered;
      });
    }
  }
}