import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/AirlineModel/user';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { AdminSysUser } from 'src/app/ModelRAC/adminSysUser';
import { AdminSysUserService } from 'src/app/Services/AdminSysUser/admin-sys-user.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  users: Array<User>;
  admin: AdminSysUser;

  constructor(private userService: UserService, private adminSysService: AdminSysUserService, private loginService: LoginService) {
    this.admin = new AdminSysUser();
   }

  ngOnInit(): void {
    this.userService.getUserRoleUsers(UserRole.AdminSys).subscribe(x=>{
      this.users = x as Array<User>;
    });

    this.adminSysService.get(this.loginService.user.id).subscribe(res => {
      this.admin = res as AdminSysUser;
    });
  }
}
