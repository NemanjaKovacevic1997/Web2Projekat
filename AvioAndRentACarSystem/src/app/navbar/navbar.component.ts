import { Component,ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UserService } from '../Services/User/user.service';
import { NgModel } from '@angular/forms';
import { LoginService } from '../Services/Login/login.service';
import { UserRole } from '../AirlineModel/userRole';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  get UserRole() { return UserRole; }
  public loginService: LoginService;

  isMyHistoryActive: boolean;
  isAirlinesActive: boolean;
  isRacActive: boolean;
  isFriendsActive: boolean;
  isInvitationsActive: boolean;
  isAirlinesProfileActive: boolean;
  isFlightsActive: boolean;
  isReportActive : boolean;

  constructor(loginService: LoginService, private router: Router) { 
    this.loginService = loginService;
  }
  
  ngOnInit(): void {
  }

  logoutClick() {
    this.loginService.logout();
  }

  changeAcitve(type:string) {
    this.resetAll();
    if(type == 'MyHistory')
      this.isMyHistoryActive = true;
    else if(type == 'Airlines')
      this.isAirlinesActive = true;
    else if(type == 'Rac')
      this.isRacActive = true;
    else if(type == 'Friends')
      this.isFriendsActive = true;
    else if(type == 'Invitations')
      this.isInvitationsActive = true;
    else if(type == 'AirlinesProfile')
      this.isAirlinesProfileActive = true;
    else if(type == 'Flights')
      this.isFlightsActive = true;
    else if(type == 'Report')
      this.isReportActive = true;
  }

  private resetAll() : void {
    this.isMyHistoryActive = false;
    this.isAirlinesActive = false;
    this.isRacActive = false;
    this.isFriendsActive = false;
    this.isInvitationsActive = false;
    this.isReportActive = false;
    this.isAirlinesProfileActive = false;
    this.isFlightsActive = false;
  }
}
