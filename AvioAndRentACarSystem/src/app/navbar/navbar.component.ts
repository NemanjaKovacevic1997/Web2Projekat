import { Component, OnInit} from '@angular/core';
import { LoginService } from '../Services/Login/login.service';
import { UserRole } from '../AirlineModel/userRole';
import { AdminSysUserService } from '../Services/AdminSysUser/admin-sys-user.service';
import { AdminSysUser } from '../ModelRAC/adminSysUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  get UserRole() { return UserRole; }
  public loginService: LoginService;

  constructor(loginService: LoginService) { 
    this.loginService = loginService;
  }
  
  ngOnInit(): void {
    
  }

  logoutClick() {
    this.loginService.logout();
  }
}
