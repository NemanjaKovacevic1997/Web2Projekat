import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserRole } from 'src/app/AirlineModel/userRole';

@Component({
  selector: 'app-menu-rac',
  templateUrl: './menu-rac.component.html',
  styleUrls: ['./menu-rac.component.css']
})
export class MenuRacComponent implements OnInit {

  public loginService: LoginService;
  get UserRole() { return UserRole; }

  constructor(loginService: LoginService) {
    this.loginService = loginService;
   }

  ngOnInit(): void {
  }

}
