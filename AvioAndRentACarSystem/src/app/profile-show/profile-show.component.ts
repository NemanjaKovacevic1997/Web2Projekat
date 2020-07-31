import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../AirlineModel/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirstNameModalComponent } from '../ProfileModals/first-name-modal/first-name-modal.component';
import { LastNameModalComponent } from '../ProfileModals/last-name-modal/last-name-modal.component';
import { EmailModalComponent } from '../ProfileModals/email-modal/email-modal.component';
import { CityModalComponent } from '../ProfileModals/city-modal/city-modal.component';
import { MobileNumberModalComponent } from '../ProfileModals/mobile-number-modal/mobile-number-modal.component';
import { PasswordModalComponent } from '../ProfileModals/password-modal/password-modal.component';

@Component({
  selector: 'profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.css']
})
export class ProfileShowComponent implements OnInit {

  myProfile : User = new User('Nemanja', 'Kovacevic', 'kovacevicnemanja1997@gmail.com', 'Gajdobra', '0604520858', 'kovac123');

  constructor(private modalService: NgbModal) { 
  }

  ngOnInit(): void {
  }

  openFirstNameModal() {
    const modalRef = this.modalService.open(FirstNameModalComponent);
    modalRef.componentInstance.firstName = this.myProfile.firstName;
    modalRef.result.then((result) => {
      if (result) {
        this.myProfile.firstName = result;
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }
    
  openLastNameModal() {
    const modalRef = this.modalService.open(LastNameModalComponent);
    modalRef.componentInstance.lastName = this.myProfile.lastName;
    modalRef.result.then((result) => {
      if (result) {
        this.myProfile.lastName = result;
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }
  
  openEmailModal(){
    const modalRef = this.modalService.open(EmailModalComponent);
    modalRef.componentInstance.email = this.myProfile.email;
    modalRef.result.then((result) => {
      if (result) {
        this.myProfile.email = result;
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  openCityModal(){
    const modalRef = this.modalService.open(CityModalComponent);
    modalRef.componentInstance.city = this.myProfile.city;
    modalRef.result.then((result) => {
      if (result) {
        this.myProfile.city = result;
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  openMobileNumberModal(){
    const modalRef = this.modalService.open(MobileNumberModalComponent);
    modalRef.componentInstance.mobileNumber = this.myProfile.mobileNumber;
    modalRef.result.then((result) => {
      if (result) {
        this.myProfile.mobileNumber = result;
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  passwords = {
    password : this.myProfile.password,
    newPassword : "",
    newPasswordRepeat : ""
  }

  openPasswordModal(){
    const modalRef = this.modalService.open(PasswordModalComponent);

    modalRef.componentInstance.passwords = this.passwords;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }
}
