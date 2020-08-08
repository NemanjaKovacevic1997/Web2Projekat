import { Component, OnInit} from '@angular/core';
import { User } from '../AirlineModel/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirstNameModalComponent } from '../ProfileModals/first-name-modal/first-name-modal.component';
import { LastNameModalComponent } from '../ProfileModals/last-name-modal/last-name-modal.component';
import { EmailModalComponent } from '../ProfileModals/email-modal/email-modal.component';
import { CityModalComponent } from '../ProfileModals/city-modal/city-modal.component';
import { MobileNumberModalComponent } from '../ProfileModals/mobile-number-modal/mobile-number-modal.component';
import { PasswordModalComponent } from '../ProfileModals/password-modal/password-modal.component';
import { UsernameModalComponent } from '../ProfileModals/username-modal/username-modal.component';
import { LoginService } from '../Services/Login/login.service';
import { UserService } from '../Services/User/user.service';

@Component({
  selector: 'profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.css']
})
export class ProfileShowComponent implements OnInit {

  myProfile: User;

  constructor(private modalService: NgbModal, private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
    let id = this.loginService.user.id;
    this.userService.get(id).subscribe((res: any) => {
                                        this.myProfile = res;
                                      },
    );
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
    modalRef.componentInstance.address = { 'city': this.myProfile.address.city, 'country': this.myProfile.address.country };
    //modalRef.componentInstance.address.city = this.myProfile.address.city;
    //modalRef.componentInstance.address.country = this.myProfile.address.country;

    modalRef.result.then((result) => {
      if (result) {
        this.myProfile.address.city = result.city;
        this.myProfile.address.country = result.country;
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

  openPasswordModal(){
    const modalRef = this.modalService.open(PasswordModalComponent);

    modalRef.componentInstance.passwords = {
      password : "",
      newPassword : "",
      newPasswordRepeat : ""
    };

    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  openUsernameModal(){
    const modalRef = this.modalService.open(UsernameModalComponent);

    modalRef.componentInstance.username = this.myProfile.username;
    modalRef.result.then((result) => {
      if (result) {
        this.myProfile.username = result;
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  saveChanges() {
    if (confirm('Are you sure you want to save this changes?')) {
      let id = this.loginService.user.id;
      this.userService.update(id, this.myProfile).subscribe();
    }
  }
}
