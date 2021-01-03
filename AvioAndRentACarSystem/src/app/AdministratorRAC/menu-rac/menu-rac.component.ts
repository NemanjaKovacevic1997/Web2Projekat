import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { FilterDataRAC } from 'src/app/ModelRAC/HelperModelRAC/filterDataRAC';

@Component({
  selector: 'app-menu-rac',
  templateUrl: './menu-rac.component.html',
  styleUrls: ['./menu-rac.component.css']
})
export class MenuRacComponent implements OnInit {

  @Output() change = new EventEmitter<FilterDataRAC>();
  @Input() racId: number;
  
  public loginService: LoginService;
  get UserRole() { return UserRole; }

  constructor(loginService: LoginService) {
    this.loginService = loginService;
   }

  ngOnInit(): void {
  }

  fetchFilterData(filterData: FilterDataRAC){
    this.change.emit(filterData);
  }
}
