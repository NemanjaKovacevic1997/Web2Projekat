import { Component, OnInit } from '@angular/core';
import { Airline } from '../AirlineModel/airline';
import { AirlineService } from '../Services/Airline/airline.service';
import { Router } from '@angular/router';
import { LoginService } from '../Services/Login/login.service';
import { UserRole } from '../AirlineModel/userRole';

@Component({
  selector: 'airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  airlines: Airline[];

  constructor(private airlineService: AirlineService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.airlineService.getAll().subscribe(res => {
      this.airlines = res as Airline[];
    })
  }

  sortByName() {
    this.airlines.sort(this.compareName);
  }

  sortByAddress() {
    this.airlines.sort(this.compareAddress);
  }

  sortByRating() {
    this.airlines.sort(this.compareRating);
  }

  private compareName( a: Airline, b: Airline ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }


  private compareAddress( a: Airline, b: Airline ) {
    if ( a.address.city < b.address.city ){
      return -1;
    }
    if ( a.address.city > b.address.city ){
      return 1;
    }
    return 0;
  }
  
  private compareRating( a: Airline, b: Airline ) {
    if ( a.averageRating > b.averageRating ){
      return -1;
    }
    if ( a.averageRating < b.averageRating ){
      return 1;
    }
    return 0;
  }

  airlineClick(id: number) {
    if(this.loginService.userRole != UserRole.AdminSys)
      this.router.navigate(['/airline', id]);
  }
}
