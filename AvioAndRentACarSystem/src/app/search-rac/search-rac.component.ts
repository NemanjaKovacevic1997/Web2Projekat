import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Options, LabelType, Ng5SliderModule } from 'ng5-slider';

@Component({
  selector: 'search-rac',
  templateUrl: './search-rac.component.html',
  styleUrls: ['./search-rac.component.css']
})
export class SearchRacComponent implements OnInit {

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

  minValue1: number = 100;
  maxValue1: number = 400;
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

  public minPickerDate;
  public minPickerTime1;
  public minPickerTime2;

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

  onSubmit() {
    if (this.form.valid)
      this.router.navigate(['/flights']);
    else
      alert("Bad input.");
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
}
