import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservationService } from '../Services/Reservation/reservation.service';
import { Airport } from '../AirlineModel/airport';
import { AirportService } from '../Services/Airport/airport.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  airports: Array<Airport>;
  
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
    date2: new FormControl(),
    tripType: new FormControl(),
    people: new FormControl(),
    class: new FormControl(),
  })

  public minPickerDate;
  public peopleNum: number;

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

  get tripType() {
    return this.form.get('tripType');
  }

  get people() {
    return this.form.get('people');
  }

  get class() {
    return this.form.get('class');
  }

  constructor(private router: Router,
     private reservationService: ReservationService,
     private airportService: AirportService) { }

  searchClick(){
    if(this.form.valid) {
      this.reservationService.setSearchData(this.from.value, this.to.value, this.date1.value, this.date2.value, this.tripType.value, this.people.value, this.class.value);
      this.router.navigate(['/all', 'flights']);
    }
    else
      alert("Bad input.");
  }


  ngOnInit(): void {
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    this.peopleNum = 1;

    this.airportService.getAll().subscribe(ret => {
      this.airports = ret as Array<Airport>;
    });
  }

  plus() {
    if(this.peopleNum <= 9)
    this.peopleNum = this.peopleNum + 1;
  }

  minus() {
    if(this.peopleNum >= 2)
      this.peopleNum = this.peopleNum - 1;
  }

}
