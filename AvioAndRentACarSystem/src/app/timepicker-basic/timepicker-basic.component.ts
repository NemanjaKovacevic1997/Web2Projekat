import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngbd-timepicker-basic',
  templateUrl: './timepicker-basic.component.html',
  styleUrls: ['./timepicker-basic.component.css']
})

export class TimepickerBasicComponent implements OnInit {
  time = {hour: 13, minute: 30};
  constructor() { }

  ngOnInit(): void {
  }

}
/*
export class NgbdTimepickerBasic {
  time = {hour: 13, minute: 30};
}
*/