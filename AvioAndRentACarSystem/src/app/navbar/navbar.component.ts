import { Component,ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UserService } from '../Services/User/user.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole : string;
  isMyHistoryActive: boolean;
  isAirlinesActive: boolean;
  isRacActive: boolean;
  isFriendsActive: boolean;
  isInvitationsActive: boolean;

  constructor(private userService : UserService) { }
  
  ngOnInit(): void {
    this.userRole = this.userService.loggedUserType;
    
  }

  changeAcitve(type:string) {
    this.resetAll();
    if(type == 'MyHistory')
    {
      this.isMyHistoryActive = true;
    }
    else if(type == 'Airlines')
    {
      this.isAirlinesActive = true;
    }
    else if(type == 'Rac')
    {
      this.isRacActive = true;
    }
    else if(type == 'Friends')
    {
      this.isFriendsActive = true;
    }
    else if(type == 'Invitations')
    {
      this.isInvitationsActive = true;
    }
    
    
  }

  private resetAll() : void {
    this.isMyHistoryActive = false;
    this.isAirlinesActive = false;
    this.isRacActive = false;
    this.isFriendsActive = false;
    this.isInvitationsActive = false;
  }
}
