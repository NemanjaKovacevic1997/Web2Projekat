import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'path';
import { Address } from '../AirlineModel/address';
import { User } from '../AirlineModel/user';
import { UserRole } from '../AirlineModel/userRole';
import { UserService } from '../Services/User/user.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

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

  constructor(private userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(ret => {
      this.allUsers = ret as Array<User>;})
  }

  signUpClick() {
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
      
    var address = new Address(0, this.city, this.country);

    var newUser = new User(this.firstname, this.lastname,this.email, address, this.phoneNumber, this.password, UserRole.Registered, this.username)
    this.userService.add(newUser)
                     .subscribe(
                       (res: any) => {
                         this.router.navigateByUrl('/sign-in');
                       },
                     ); 
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
