import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private router: Router) { }

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
