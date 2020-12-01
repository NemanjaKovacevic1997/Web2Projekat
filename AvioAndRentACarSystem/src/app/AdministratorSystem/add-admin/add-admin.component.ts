import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/AirlineModel/address';
import { User } from 'src/app/AirlineModel/user';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(ret => {
      this.allUsers = ret as Array<User>;})
  }

  addNew() {
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

    var newUser = new User(this.firstname, this.lastname,this.email, address, this.phoneNumber, this.password, UserRole.AdminSys, this.username)
    this.userService.add(newUser)
                     .subscribe(
                       (res: any) => {
                         //this.router.navigateByUrl('/sign-in');
                         alert("New system administrator added. Reload this page to show up new list.")
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
