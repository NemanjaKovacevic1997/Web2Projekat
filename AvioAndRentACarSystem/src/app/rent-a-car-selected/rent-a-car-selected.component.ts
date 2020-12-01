import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from '../AirlineModel/userRole';
import { Car } from '../ModelRAC/car';
import { FilterDataRAC } from '../ModelRAC/HelperModelRAC/filterDataRAC';
import { RACService } from '../ModelRAC/racService';
import { CarService } from '../Services/Car/car.service';
import { LoginService } from '../Services/Login/login.service';
import { RacServiceService } from '../Services/RACService/rac-service.service';

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

  constructor(private racServiceService: RacServiceService, loginService: LoginService, private activatedRoute: ActivatedRoute, private carService: CarService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
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
    });
  }

  fetchFilterData(filterData: FilterDataRAC) {
    if(filterData.deliveryAddress != undefined){
      let carsAllCloned: Array<Car> = [];
      for(let car of this.carsAll) {
        carsAllCloned.push(car);
      }
    
      var i = carsAllCloned.length;
      while (i--) {
        let car = carsAllCloned[i];
        if(car.type != undefined){
          if(car.type != filterData.carType || car.dailyPrice > filterData.maxTotalPrice || car.dailyPrice < filterData.minTotalPrice){
            carsAllCloned.splice(i, 1);
            continue;
          }
        }
      }

      this.cars = carsAllCloned;
    }
  }
}
