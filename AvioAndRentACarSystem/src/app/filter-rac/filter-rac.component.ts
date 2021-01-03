import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';
import { Router } from '@angular/router';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { SearchDataRAC } from '../ModelRAC/HelperModelRAC/searchDataRAC';
import { FilterDataRAC } from '../ModelRAC/HelperModelRAC/filterDataRAC';
import { RACAddress } from '../ModelRAC/racAddress';
import { RacAddressService } from '../Services/RACAddress/rac-address.service';

@Component({
  selector: 'app-filter-rac',
  templateUrl: './filter-rac.component.html',
  styleUrls: ['./filter-rac.component.css']
})
export class FilterRacComponent implements OnInit {

  @Output() change = new EventEmitter<FilterDataRAC>();
  @Input() racId: number;

  public minPickerDate;
  public minPickerTime1;
  public minPickerTime2;
  public minValue1: number = 100;
  public maxValue1: number = 400;
  public racAddresses: Array<RACAddress>;

  form = new FormGroup({
    deliveryAddress: new FormControl('', [
      Validators.required
    ]),
    returnAddress: new FormControl('', [
      Validators.required
    ]),
    date1: new FormControl('', [
      Validators.required
    ]),
    date2: new FormControl('', [
      Validators.required
    ]),
    type: new FormControl('', [
      Validators.required
    ]),
    passengers: new FormControl('', [
      Validators.required
    ])
  })

  options1: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b style="color:white">Min price:</b> ' + value + '€';//EU
        case LabelType.High:
          return '<b style="color:white">Max price:</b> ' + value + '€';
        default:
          return value + '€';
      }
    }
  };

  get deliveryAddress() {
    return this.form.get('deliveryAddress');
  }

  get returnAddress() {
    return this.form.get('returnAddress');
  }

  get date1() {
    return this.form.get('date1');
  }

  get date2() {
    return this.form.get('date2');
  }

  get type() {
    return this.form.get('type');
  }

  get passengers() {
    return this.form.get('passengers');
  }

  constructor(private router: Router, config: NgbTimepickerConfig, private racAddressService: RacAddressService) {
    config.meridian = true;
    config.minuteStep = 15;
    this.racAddresses = new Array<RACAddress>();
   }

  ngOnInit(): void {
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

    this.racAddressService.getRACServiceAddresses(this.racId).subscribe(ret => {
      this.racAddresses = ret as Array<RACAddress>;
    });
  }

  onSubmit() {
    if (this.form.valid){
    let filterData: FilterDataRAC = new FilterDataRAC();
    filterData.deliveryAddress = this.deliveryAddress.value;
    filterData.returnAddress = this.returnAddress.value;
    filterData.date1Day = this.date1.value.day;
    filterData.date1Month = this.date1.value.month-1;
    filterData.date1Year = this.date1.value.year;
    filterData.date2Day = this.date2.value.day;
    filterData.date2Month = this.date2.value.month-1;
    filterData.date2Year = this.date2.value.year;
    filterData.time1Hour = this.minPickerTime1.hour+1;
    filterData.time1Minute = this.minPickerTime1.minute;
    filterData.time2Hour = this.minPickerTime2.hour+1;
    filterData.time2Minute = this.minPickerTime2.minute;
    filterData.carType = this.type.value;
    filterData.numberOfPasengers = this.passengers.value;
    filterData.maxTotalPrice = this.maxValue1;
    filterData.minTotalPrice = this.minValue1;

    console.log(filterData);
    this.change.emit(filterData);
    }
    else
      alert("Bad input.");
  }
}
