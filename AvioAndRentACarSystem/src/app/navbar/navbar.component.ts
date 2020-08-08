import { Component,ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { LoginService } from '../Services/Login/login.service';
import { UserRole } from '../AirlineModel/userRole';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  get UserRole() { return UserRole; }
  public loginService: LoginService;

  constructor(loginService: LoginService, private router: Router) { 
    this.loginService = loginService;
  }
  
  ngOnInit(): void {
  }

  logoutClick() {
    this.loginService.logout();
  }
}
