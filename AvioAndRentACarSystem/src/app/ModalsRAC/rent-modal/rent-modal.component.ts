import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { start } from 'repl';
import { RACAddress } from 'src/app/ModelRAC/racAddress';
import { RACService } from 'src/app/ModelRAC/racService';
import { AdminRacUserService } from 'src/app/Services/AdminRACUser/admin-rac-user.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { RacAddressService } from 'src/app/Services/RACAddress/rac-address.service';
import { RacServiceService } from 'src/app/Services/RACService/rac-service.service';

@Component({
  selector: 'app-rent-modal',
  templateUrl: './rent-modal.component.html',
  styleUrls: ['./rent-modal.component.css']
})
export class RentModalComponent implements OnInit {

  @Input() public myRent;
  @Input() public racId;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public startDate;
  public endDate;
  public startRACAddressId: number;
  public endRACAddressId: number;
  public minPickerDate;
  public minPickerTime1;
  public minPickerTime2;
  public addresses: Array<RACAddress>
  
  constructor(
    public activeModal: NgbActiveModal,
    private config: NgbTimepickerConfig,
    private racAddressesService: RacAddressService,
    private racService: RacServiceService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { 
    config.meridian = true;
    config.minuteStep = 15;
    this.racId = 0;
  }

  ngOnInit() {
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
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

    this.startDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    };

    this.endDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    };

    this.racAddressesService.getRACServiceAddresses(this.racId).subscribe(ret=>{
      this.addresses = ret as Array<RACAddress>;
    });
  }

  passBack() {
    this.myRent.startRACAddressId = this.startRACAddressId;
    this.myRent.endRACAddressId = this.endRACAddressId;
    this.myRent.startDate = new Date(this.startDate.year,this.startDate.month,this.startDate.day,this.minPickerTime1.hour, this.minPickerTime1.minute);
    this.myRent.endDate = new Date(this.endDate.year,this.endDate.month,this.endDate.day,this.minPickerTime2.hour, this.minPickerTime2.minute);

    console.log(this.myRent)

    this.passEntry.emit(this.myRent);
    this.activeModal.close(this.myRent);
  }
}
