import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/AirlineModel/address';
import { User } from 'src/app/AirlineModel/user';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { AdminSysUser } from 'src/app/ModelRAC/adminSysUser';
import { AdminSysUserService } from 'src/app/Services/AdminSysUser/admin-sys-user.service';
import { LoginService } from 'src/app/Services/Login/login.service';
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
  predefined: boolean;

  constructor(private userService: UserService, private adminSysUserService: AdminSysUserService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(ret => {
      this.allUsers = ret as Array<User>;})

    this.adminSysUserService.get(this.loginService.user.id).subscribe(ret => {
      var admin = ret as AdminSysUser;
      this.predefined = admin.predefined;
    })
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
    var newUser = new User(this.firstname, this.lastname,this.email, this.phoneNumber, this.password, UserRole.AdminSys, this.username, address)
    var adminSysUser = new AdminSysUser();
    adminSysUser.user = newUser;
    adminSysUser.predefined = false;
    this.adminSysUserService.add(adminSysUser).subscribe(() => {
      alert("New system administrator added. Reload this page to show up new list.")
    });
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
