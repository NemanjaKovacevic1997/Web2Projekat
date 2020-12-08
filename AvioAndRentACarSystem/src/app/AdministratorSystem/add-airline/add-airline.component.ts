import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/AirlineModel/address';
import { AdminAirlinesUser } from 'src/app/AirlineModel/adminAirlinesUser';
import { Airline } from 'src/app/AirlineModel/airline';
import { AirlineAirport } from 'src/app/AirlineModel/airlineAirport';
import { Airport } from 'src/app/AirlineModel/airport';
import { PriceList } from 'src/app/AirlineModel/priceList';
import { User } from 'src/app/AirlineModel/user';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { AdministratorRacModalComponent } from 'src/app/ModalsRAC/administrator-rac-modal/administrator-rac-modal.component';
import { BusinessDestinationsModalComponent } from 'src/app/ModalsRAC/business-destinations-modal/business-destinations-modal.component';
import { AdminAirlinesUserService } from 'src/app/Services/AdminAirlinesUser/admin-airlines-user.service';
import { AirlineService } from 'src/app/Services/Airline/airline.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
  
  public airline: Airline;
  public address: Address;
  public allUsers: Array<User>;
  public userId: number;
  public allAirlines: Array<Airline>;
  public airlineId: number;
  public airlineAdministrator: User;
  public businessDestination: Airport;
  public businessDestinations: Array<Airport>;
  public airlineAirports: Array<AirlineAirport>;
  get UserRole() { return UserRole; }

  constructor(private airlineService: AirlineService, private modalService: NgbModal, private userService: UserService, private loginService: LoginService, private adminAirlinesUserService: AdminAirlinesUserService) {
    this.airline = new Airline();
    this.airline.address = new Address(0,"","");
    this.airline.pricelist = new PriceList(0,0,0);
    this.businessDestinations = new Array<Airport>();
    this.airlineAdministrator = new User();
    this.airlineId = 0;
    this.userId = 0;
    this.loginService = loginService;
   }

  ngOnInit(): void {
    this.userService.getAll().subscribe(res => {
      this.allUsers = res as Array<User>;
    });

    this.airlineService.getAll().subscribe(res => {
      this.allAirlines = res as Array<Airline>;
    });
  }

  addAirline(){
    if (confirm('Are you sure you want to save this service?')) {
      this.airline.averageRating = 0;

      this.airlineService.add(this.airline).subscribe(() => {
        this.airlineAdministrator.role = UserRole.AdminAirlines;
        this.userService.add(this.airlineAdministrator).subscribe(() => {
          //PRONALAZIM NAJVECI ID UNUTAR LISTE AIRLINE SERVISA KAKO SE NE BI POTREFILO DA BUDU 2 SA ISTIM ID-JEM
          this.allAirlines.forEach(element => {
            if(element.id > this.airlineId)
              this.airlineId = element.id;
          });
     
          //PRONALAZIM NAJVECI ID UNUTAR LISTE USER-A KAKO SE NE BI POTREFILO DA BUDU 2 SA ISTIM ID-JEM
          this.allUsers.forEach(element => {
            if(element.id > this.userId)
              this.userId = element.id;
          });
          
          var adminAirlineUser = new AdminAirlinesUser();
          adminAirlineUser.id = this.userId + 1;
          adminAirlineUser.airlineServiceId = this.airlineId + 1;
          this.adminAirlinesUserService.add(adminAirlineUser).subscribe(() => {
            
          });
        }); 
        alert("Service is saved successfuly.")
      }); 
    }
  }

  openAdministratorAirlineModal(){
    if(this.loginService.userRole == UserRole.AdminSys){
      const modalRef = this.modalService.open(AdministratorRacModalComponent);
      modalRef.componentInstance.racAdministrator = this.airlineAdministrator;
      modalRef.result.then((result) => {
        if (result) {
          this.airlineAdministrator = result;
          console.log(result);
        }
      }, (reason) => {
        console.log(reason);
      });
    }
  }

  openBusinessDestinationsModal(){
    this.businessDestination = new Airport("",new Address(0,"",""));
    if(this.loginService.userRole == UserRole.AdminSys){
      const modalRef = this.modalService.open(BusinessDestinationsModalComponent);
      modalRef.componentInstance.businessDestination = this.businessDestination;
      modalRef.result.then((result) => {
        if (result) {
          this.businessDestination = result;
          console.log(result);
          this.businessDestinations.push(this.businessDestination)
        }
      }, (reason) => {
        console.log(reason);
      });
    }
  }

  deleteAdmin(){
    this.airlineAdministrator = new User();
  }

  deleteBusinessDestination(i: number){
    this.businessDestinations.splice(i,1);
  }
}
