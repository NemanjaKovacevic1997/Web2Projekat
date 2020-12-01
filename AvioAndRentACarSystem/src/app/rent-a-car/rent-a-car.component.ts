import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../AirlineModel/userRole';
import { RACService } from '../ModelRAC/racService';
import { LoginService } from '../Services/Login/login.service';
import { RacServiceService } from '../Services/RACService/rac-service.service';

@Component({
  selector: 'rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnInit {

  @Input() racServices: Array<RACService>;

  constructor(private racServiceService: RacServiceService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void { }

  racClick(id: number) {
    if(this.loginService.userRole != UserRole.AdminSys)
      this.router.navigate(['/rent-a-car-search-selected', id]);
  }
}
