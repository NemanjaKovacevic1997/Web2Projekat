import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxTimePickerComponent } from "igniteui-angular";

@Component({
  selector: 'app-ngbd-timepicker',
  templateUrl: './timepicker.component.html'
})
export class TimepickerComponent {
  time = {hour: 13, minute: 30};
  meridian = true;

  toggleMeridian() {
      this.meridian = !this.meridian;
  }
}


