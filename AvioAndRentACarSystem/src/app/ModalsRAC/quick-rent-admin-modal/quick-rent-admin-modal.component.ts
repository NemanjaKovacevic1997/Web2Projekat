import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Rent } from 'src/app/ModelRAC/rent';
import { RentService } from 'src/app/Services/Rent/rent.service';

@Component({
  selector: 'app-quick-rent-admin-modal',
  templateUrl: './quick-rent-admin-modal.component.html',
  styleUrls: ['./quick-rent-admin-modal.component.css']
})
export class QuickRentAdminModalComponent implements OnInit {

  @Input() public quickRentCar;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public date;
  public minPickerDate;
  public disabledDates:NgbDateStruct[]=[]

  constructor(
    public activeModal: NgbActiveModal,
    public rentService: RentService
  ) { }

  form = new FormGroup({
    discount: new FormControl('', [Validators.required,Validators.max(100),Validators.min(0)]),         
    date: new FormControl('', [Validators.required],)
  })

  ngOnInit() {
    this.getDisabledDates();

    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
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
    this.rentService.getCarsRents(this.quickRentCar.id).subscribe(res => {
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
    });
  }

  passBack() {
    if (this.form.valid){
      this.quickRentCar.quickRentDate = new Date(this.date.year, this.date.month-1, this.date.day+1);
      this.passEntry.emit(this.quickRentCar);
      this.activeModal.close(this.quickRentCar);
    }
    else
      alert("Bad input.");
  }
}