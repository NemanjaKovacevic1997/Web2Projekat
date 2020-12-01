import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/AirlineModel/user';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  users: Array<User>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserRoleUsers(UserRole.AdminSys).subscribe(x=>{
      this.users = x as Array<User>;
    })
  }
}
