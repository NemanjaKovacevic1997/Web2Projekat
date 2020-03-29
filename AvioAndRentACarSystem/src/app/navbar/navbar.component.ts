import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/User/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  userRole : string;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userRole = this.userService.loggedUserType;
  }

  

}
