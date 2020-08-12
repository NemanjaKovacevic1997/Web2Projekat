import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form = new FormGroup({
    from: new FormControl('', [
      Validators.required
    ]),
    to : new FormControl('', [
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


  searchClick(){
    if(this.form.valid)
      this.router.navigate(['all', 'flights']);
    else
      alert("Bad input.");
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  }

}
