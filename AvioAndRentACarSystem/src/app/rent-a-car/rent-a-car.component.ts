import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../AirlineModel/userRole';
import { RACAddress } from '../ModelRAC/racAddress';
import { RACService } from '../ModelRAC/racService';
import { LoginService } from '../Services/Login/login.service';
import { RacAddressService } from '../Services/RACAddress/rac-address.service';
import { RacServiceService } from '../Services/RACService/rac-service.service';

@Component({
  selector: 'rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnInit {

  @Input() racServices: Array<RACService>;
  
  public mainAddresses: Map<number, RACAddress>;
  public racAddresses: Array<RACAddress>;

  constructor(private router: Router, private loginService: LoginService, private racAddressService: RacAddressService) { 
    this.mainAddresses = new Map<number, RACAddress>();
  }

  ngOnInit(): void {
    this.racAddressService.getRACServiceMainAddresses(1).subscribe(ret=>{
      this.racAddresses = ret as Array<RACAddress>;
      this.racAddresses.forEach(element => {
        this.mainAddresses.set(element.id, element);
      });
    });
  }
  //mainAddresses[racService.id].value.street

  racClick(id: number) {
    if(this.loginService.userRole != UserRole.AdminSys)
      this.router.navigate(['/rent-a-car-search-selected', id]);
  }
}
