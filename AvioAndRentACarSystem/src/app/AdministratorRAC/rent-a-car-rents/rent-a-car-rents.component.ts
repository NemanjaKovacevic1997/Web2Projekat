import { Component, OnInit } from '@angular/core';
import { RACService } from 'src/app/ModelRAC/racService';
import { Rent } from 'src/app/ModelRAC/rent';
import { LoginService } from 'src/app/Services/Login/login.service';
import { RacServiceService } from 'src/app/Services/RACService/rac-service.service';
import { RentService } from 'src/app/Services/Rent/rent.service';

@Component({
  selector: 'app-rent-a-car-rents',
  templateUrl: './rent-a-car-rents.component.html',
  styleUrls: ['./rent-a-car-rents.component.css']
})
export class RentACarRentsComponent implements OnInit {

  public rac: RACService;
  public rents: Array<Rent>;

  constructor(private loginService: LoginService, private rentService: RentService, private racService: RacServiceService) { }

  ngOnInit(): void {
    this.rents = new Array<Rent>();
    this.racService.getAdminRACServiceRACService(this.loginService.user.id).subscribe(ret => {
      this.rac = ret as RACService;
      this.rentService.getRACRents(this.rac.id).subscribe(ret => {
        this.rents = ret as Array<Rent>;
      });
    });
  }
}
