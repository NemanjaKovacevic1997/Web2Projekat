import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../AirlineModel/userRole';
import { RACAddress } from '../ModelRAC/racAddress';
import { RACService } from '../ModelRAC/racService';
import { LoginService } from '../Services/Login/login.service';
import { RacAddressService } from '../Services/RACAddress/rac-address.service';

@Component({
  selector: 'rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnChanges {

  @Input() racServices: Array<RACService>;
  
  public racAddresses: Array<RACAddress>;

  constructor(private router: Router, private loginService: LoginService, private racAddressService: RacAddressService) { 
    this.racAddresses = new Array<RACAddress>();
  }

  ngOnChanges(): void {
    this.racAddressService.getRACServiceMainAddresses(1).subscribe(ret=>{
      this.racAddresses = ret as Array<RACAddress>;
      this.racAddresses.forEach(element => {
        this.racServices[element.racServiceId-1].mainAddress = element;
      });
    });
  }

  sortByName() {
    this.racServices.sort(this.compareName);
  }

  sortByAddress() {
    this.racServices.sort(this.compareAddress);
  }

  sortByRating() {
    this.racServices.sort(this.compareRating);
  }

  private compareName( a: RACService, b: RACService ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  private compareAddress( a: RACService, b: RACService ) {
    if ( a.mainAddress.city < b.mainAddress.city ){
      return -1;
    }
    if ( a.mainAddress.city > b.mainAddress.city ){
      return 1;
    }
    return 0;
  }
  
  private compareRating( a: RACService, b: RACService ) {
    if ( a.rating > b.rating ){
      return -1;
    }
    if ( a.rating < b.rating ){
      return 1;
    }
    return 0;
  }

  racClick(id: number) {
    if(this.loginService.userRole != UserRole.AdminSys)
      this.router.navigate(['/rent-a-car-search-selected', id]);
  }
}