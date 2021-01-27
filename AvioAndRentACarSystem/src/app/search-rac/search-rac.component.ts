import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { RacServiceService } from '../Services/RACService/rac-service.service';
import { SearchDataRAC } from '../ModelRAC/HelperModelRAC/searchDataRAC';
import { RacAddressService } from '../Services/RACAddress/rac-address.service';
import { RACAddress } from '../ModelRAC/racAddress';

@Component({
  selector: 'search-rac',
  templateUrl: './search-rac.component.html',
  styleUrls: ['./search-rac.component.css']
})
export class SearchRacComponent implements OnInit {
  
  @Output() change = new EventEmitter<SearchDataRAC>();

  public addresses: Array<RACAddress>;
  public selectedAddress: RACAddress;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    location: new FormControl('', [
      Validators.required
    ]),
    date1: new FormControl('', [
      Validators.required
    ]),
    date2: new FormControl('', [
      Validators.required
    ])
  })

  public minPickerDate;
  public minPickerTime1;
  public minPickerTime2;

  get name() {
    return this.form.get('name');
  }

  get location() {
    return this.form.get('location');
  }

  get date1() {
    return this.form.get('date1');
  }

  get date2() {
    return this.form.get('date2');
  }

  constructor(private router: Router, config: NgbTimepickerConfig, private racServiceService: RacServiceService, private racAddressService: RacAddressService) {
    config.meridian = true;
    config.minuteStep = 15;
    this.addresses = new Array<RACAddress>();
    this.selectedAddress = new RACAddress();
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

    this.racAddressService.getAddressesForSearch(1).subscribe(ret =>{
      this.addresses = ret as Array<RACAddress>;
    });
  } 
  
  onSubmit() {
    if (this.form.valid){
      let filterData: SearchDataRAC = new SearchDataRAC();
      filterData.nameOfService = this.name.value;
      filterData.location = this.location.value;
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

      console.log(filterData);
      this.change.emit(filterData);
    }
    else
      alert("Bad input.");
  }
}