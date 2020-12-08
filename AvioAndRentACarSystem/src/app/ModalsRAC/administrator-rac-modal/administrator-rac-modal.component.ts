import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/AirlineModel/address';
import { User } from 'src/app/AirlineModel/user';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-administrator-rac-modal',
  templateUrl: './administrator-rac-modal.component.html',
  styleUrls: ['./administrator-rac-modal.component.css']
})
export class AdministratorRacModalComponent implements OnInit {

  @Input() public racAdministrator;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  allUsers: Array<User>;
  firstname:string ="";
  lastname:string ="";
  email: string ="";
  username: string ="";
  password: string ="";
  repeatPassword: string ="";
  phoneNumber: string ="";
  city: string ="";
  country: string ="";
  message: string ="";

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(ret => {
      this.allUsers = ret as Array<User>;})
  }

  passBack() {
    this.racAdministrator.firstName = this.firstname;
    this.racAdministrator.lastName = this.lastname;
    this.racAdministrator.username = this.username;
    this.racAdministrator.password = this.password;
    this.racAdministrator.address = new Address(0, this.city, this.country);
    this.racAdministrator.email = this.email;
    this.racAdministrator.mobileNumber = this.phoneNumber;
    this.racAdministrator.role = UserRole.AdminRAC;
    this.passEntry.emit(this.racAdministrator);
    this.activeModal.close(this.racAdministrator);
  }

  validation() {
    if(this.checkInput() == false){
      alert(this.message);
      return;
    }

    var exists = false;
    this.allUsers.forEach(element => {
      if(element.username === this.username){
        alert("Username " + this.username +" already exists.");
        exists = true;
      }
    });

    if(exists){
      return
    } 
    else{
      this.passBack();
    }
  }

  checkInput():boolean{
    if(this.firstname=="" || this.lastname =="" || this.email=="" || this.city=="" || this.country=="" || this.password=="" || this.username=="" || this.phoneNumber==""){
      this.message = "Bad input. All fields must be provided.";
      return false;
    }
    else if(this.repeatPassword !== this.password) {
      this.message = "Incorrect repeated password.";
      return false;
    }
    else  
      return true
  }
}
