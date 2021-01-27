import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbDate, NgbDateStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { RACAddress } from 'src/app/ModelRAC/racAddress';
import { Rent } from 'src/app/ModelRAC/rent';
import { LoginService } from 'src/app/Services/Login/login.service';
import { RacAddressService } from 'src/app/Services/RACAddress/rac-address.service';
import { RacServiceService } from 'src/app/Services/RACService/rac-service.service';
import { RentService } from 'src/app/Services/Rent/rent.service';

@Component({
  selector: 'app-rent-modal',
  templateUrl: './rent-modal.component.html',
  styleUrls: ['./rent-modal.component.css']
})
export class RentModalComponent implements OnInit {

  @Input() public myRent;
  @Input() public racId;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public startDate;
  public endDate;
  public startRACAddressId: number;
  public endRACAddressId: number;
  public minPickerDate;
  public minPickerTime1;
  public minPickerTime2;
  public addresses: Array<RACAddress>;
  public disabledDates:NgbDateStruct[]=[];

  constructor(
    public activeModal: NgbActiveModal,
    private config: NgbTimepickerConfig,
    private racAddressesService: RacAddressService,
    private racService: RacServiceService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private rentService: RentService
  ) { 
    config.meridian = true;
    config.minuteStep = 15;
    this.racId = 0;
  }

  ngOnInit() {
    this.getDisabledDates();
    
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    this.minPickerTime1 = {
      hour: new Date().getHours(),
      minutes: new Date().getMinutes()
    }

    this.minPickerTime2 = {
      hour: new Date().getHours(),
      minutes: new Date().getMinutes()
    }

    this.startDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    this.endDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    this.racAddressesService.getRACServiceAddresses(this.racId).subscribe(ret=>{
      this.addresses = ret as Array<RACAddress>;
    });
  }

  setMonthWith28Days(date: NgbDate, days: number, i: number){
    var j = 0;
    while(days != i){
      if(date.day + j == 29){
        break;
      }
      else{
        this.disabledDates.push(new NgbDate(date.year, date.month, date.day + j));
        i++;
        j++;
      }
    }

    if(days != i)
      this.setMonthWith31Days(new NgbDate(date.year, 3, 1), days, i);
  }

  setMonthWith30Days(date: NgbDate, days: number, i: number){
    let j = 0;
    while(days != i){
      if(date.day + j == 31){
        break;
      }
      else{
        this.disabledDates.push(new NgbDate(date.year, date.month, date.day + j));
        i++;
        j++;
      }
    }

    if(days != i)
      this.setMonthWith31Days(new NgbDate(date.year, date.month+1, 1), days, i);
  }

  setMonthWith31Days(date: NgbDate, days: number, i: number){
    let j = 0;
    while(days != i){
      if(date.day + j == 32){
        break;
      }
      else{
        this.disabledDates.push(new NgbDate(date.year, date.month, date.day + j));
        i++;
        j++;
      }
    }

    if(days != i && date.month == 1)
      this.setMonthWith28Days(new NgbDate(date.year, 2, 1), days, i);
    else if(days != i && date.month == 7)
      this.setMonthWith31Days(new NgbDate(date.year, 8, 1), days, i);
    else if(days != i && date.month == 12)
      this.setMonthWith31Days(new NgbDate(date.year+1, 1, 1), days, i);
    else if(days != i && date.month != 1)
      this.setMonthWith30Days(new NgbDate(date.year, date.month+1, 1), days, i);
  }
  
  isDisabled=(date:NgbDate,current: {month: number,year:number})=> {
    //in current we have the month and the year actual
    return this.disabledDates.find(x=>new NgbDate(x.year,x.month,x.day).equals(date))?
         true:false;
  }

  getDisabledDates(){
    this.rentService.getCarsRents(this.myRent.carId).subscribe(res => {
      let rents = res as Array<Rent>;
      rents.forEach(element => {
        let startDate = new Date(element.startDate);
        let endDate = new Date(element.endDate);
        let i = 0;
        let days = Math.floor((Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) ) /(1000 * 60 * 60 * 24));
        days++;
        if(startDate.getMonth()+1 == 1){
          this.setMonthWith31Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 2){
          this.setMonthWith28Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 3){
          this.setMonthWith31Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 4){
          this.setMonthWith30Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 5){
          this.setMonthWith31Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 6){
          this.setMonthWith30Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 7){
          this.setMonthWith31Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 8){
          this.setMonthWith31Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 9){
          this.setMonthWith30Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 10){
          this.setMonthWith31Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 11){
          this.setMonthWith30Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
        else if(startDate.getMonth()+1 == 12){
          this.setMonthWith31Days(new NgbDate(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate()), days, i);
        }
      });
      //UKOLIKO JE AUTO NA POPUSTU ZA ODREDJENI DAN, POTREBNO JE UBACITI I TAJ DATUM U "disableDates"
      if(this.myRent.car.quickRented){
        let date = new Date(this.myRent.car.quickRentDate);
        alert(date)
        this.disabledDates.push(new NgbDate(date.getFullYear(), date.getMonth()+1, date.getDate()));
      }
    });
  }

  checkInput(): boolean{
    if(this.myRent.numberOfUsers==undefined || 
       this.startRACAddressId==undefined || 
       this.endRACAddressId==undefined ||
       this.myRent.startDate==undefined ||
       this.myRent.endDate==undefined
       ){
      alert("Bad input. Empty field or invalid date.")
      return false;
    }
    else if(this.myRent.startDate.getTime() > this.myRent.endDate.getTime()){
      alert("Start date must be before end date.");
      return false;
    }
    return true;
  }

  passBack() {
    let contain = false;
    this.myRent.startDate = new Date(this.startDate.year,this.startDate.month - 1,this.startDate.day,this.minPickerTime1.hour, this.minPickerTime1.minute);
    this.myRent.endDate = new Date(this.endDate.year,this.endDate.month - 1,this.endDate.day,this.minPickerTime2.hour, this.minPickerTime2.minute);
    
    if(this.checkInput()){
      this.disabledDates.forEach(element => {
        var check = new Date(element.year, element.month-1, element.day);
        if((check.getTime() <= this.myRent.endDate.getTime() && check.getTime() >= this.myRent.startDate.getTime())){
          contain = true;
        }
      });
  
      //PROVERA ZA QUICK RENT DATUM
      if(this.myRent.car.quickRented){
        let date = new Date(this.myRent.car.quickRentDate)
        if((date.getTime() <= this.myRent.endDate.getTime() && date.getTime() >= this.myRent.startDate.getTime())){
          contain = true;
        }
      }
  
      if(contain)
        alert("Rent contain disabled date! Please select another date range.");
      else{
        this.myRent.startRACAddressId = this.startRACAddressId;
        this.myRent.endRACAddressId = this.endRACAddressId;
        console.log(this.myRent)
    
        this.passEntry.emit(this.myRent);
        this.activeModal.close(this.myRent);
      }
    }
  }
}