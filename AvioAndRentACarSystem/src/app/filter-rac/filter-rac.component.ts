import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';
import { Router } from '@angular/router';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-rac',
  templateUrl: './filter-rac.component.html',
  styleUrls: ['./filter-rac.component.css']
})
export class FilterRacComponent implements OnInit {

  public minPickerDate;
  public minPickerTime1;
  public minPickerTime2;
  public minValue1: number = 100;
  public maxValue1: number = 400;

  form = new FormGroup({
    from: new FormControl('', [
      Validators.required
    ]),
    to: new FormControl('', [
      Validators.required
    ]),
    date1: new FormControl('', [
      Validators.required
    ]),
    date2: new FormControl('', [
      Validators.required
    ]),
    time2: new FormControl('', [
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

  get from() {
    return this.form.get('from');
  }

  get to() {
    return this.form.get('to');
  }

  get date1() {
    return this.form.get('date1');
  }

  get date2() {
    return this.form.get('date2');
  }

  get time2(){
    return this.form.get('time2');
  }

  constructor(private router: Router, config: NgbTimepickerConfig) {
    config.meridian = true;
    config.minuteStep = 15;
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
  }

  onSubmit() {
    if (this.form.valid)
      this.router.navigate(['/flights']);
    else
      alert("Bad input.");
  }
}
