import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PriceListModalComponent } from 'src/app/ModalsRAC/price-list-modal/price-list-modal.component';
import { BranchesModalComponent } from 'src/app/ModalsRAC/branches-modal/branches-modal.component';
import { AddressRacModalComponent } from 'src/app/ModalsRAC/address-rac-modal/address-rac-modal.component';
import { ImageService } from 'src/app/Services/Image/image.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { NameRacModalComponent } from 'src/app/ModalsRAC/name-rac-modal/name-rac-modal.component';
import { PromotionalDescriptionRacComponent } from 'src/app/ModalsRAC/promotional-description-rac/promotional-description-rac.component';
import { RacServiceService } from 'src/app/Services/RACService/rac-service.service';
import { AdminRacAuthGuardService } from 'src/app/Services/AuthGuards/adminRAC/admin-rac-auth-guard.service';
import { AdminRACUser } from 'src/app/ModelRAC/adminRACUser';
import { AdminRacUserService } from 'src/app/Services/AdminRACUser/admin-rac-user.service';
import { RACService } from 'src/app/ModelRAC/racService';
import { CarService } from 'src/app/Services/Car/car.service';
import { Car } from 'src/app/ModelRAC/car';
import { Airline } from 'src/app/AirlineModel/airline';
import { AirlineService } from 'src/app/Services/Airline/airline.service';
import { ActivatedRoute } from '@angular/router';
import { RacAddressService } from 'src/app/Services/RACAddress/rac-address.service';
import { RACAddress } from 'src/app/ModelRAC/racAddress';

@Component({
  selector: 'app-info-rac',
  templateUrl: './info-rac.component.html',
  styleUrls: ['./info-rac.component.css']
})
export class InfoRacComponent implements OnInit {

  public id: number;
  public rac: RACService;
  myBranches: string = "Beograd, Pozeska 44\nZemun, Maksima Gorkog 13\nBeograd, Knez Mihajlova 37";
  get UserRole() { return UserRole; }
  public loginService: LoginService;
  public racAddresses: Array<RACAddress>;
  
  constructor(private modalService: NgbModal, private activatedRoute: ActivatedRoute, loginService: LoginService, private racServiceService: RacServiceService, private racAddressService: RacAddressService) {
    this.rac = new RACService();
    this.racAddresses = new Array<RACAddress>();
    this.loginService = loginService;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });

    this.getRACService();
  }

  getRACService(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      this.racServiceService.getAdminRACServiceRACService(this.loginService.user.id).subscribe(ret => { 
        this.rac = ret as RACService
        this.racAddressService.getRACServiceAddresses(this.rac.id).subscribe( ret => {
          this.racAddresses = ret as Array<RACAddress>;   
        });
      });
    }else{
      this.racServiceService.get(this.id).subscribe(ret => {
        this.rac = ret as RACService;
      });
      this.racAddressService.getRACServiceAddresses(this.id).subscribe( ret => {
        this.racAddresses = ret as Array<RACAddress>;   
      });
    }
  }

  saveChanges() {
    if (confirm('Are you sure you want to save changes?')) {
      this.racServiceService.update(this.rac.id, this.rac).subscribe(() => {
        alert("Changes are saved successfuly.")
      });
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.rac.logo = event.target.result.toString();
      }
    }
  }

  openNameRacModal(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      const modalRef = this.modalService.open(NameRacModalComponent);
      modalRef.componentInstance.myName = this.rac.name;
      modalRef.result.then((result) => {
        if (result) {
          this.rac.name = result;
          console.log(result);
        }
      }, (reason) => {
        console.log(reason);
      });
    }
  }

  openPromotionalDescriptionRacModal(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      const modalRef = this.modalService.open(PromotionalDescriptionRacComponent);
      modalRef.componentInstance.myPromotionalDescription = this.rac.promotionalDescription;
      modalRef.result.then((result) => {
        if (result) {
          this.rac.promotionalDescription = result;
          console.log(result);
        }
      }, (reason) => {
        console.log(reason);
      });
    }
  }

  openAddressRacModal(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      const modalRef = this.modalService.open(AddressRacModalComponent);
      modalRef.componentInstance.myAddress = this.rac.mainAddress;
      modalRef.result.then((result) => {
        if (result) {
          this.rac.mainAddress = result;
          console.log(result);
        }
      }, (reason) => {
        console.log(reason);
      });
    }
  }

  openPriceListModal(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      const modalRef = this.modalService.open(PriceListModalComponent);
      modalRef.componentInstance.myPriceList = this.rac.priceList;
      modalRef.result.then((result) => {
        if (result) {
          this.rac.priceList = result;
          console.log(result);
        }
      }, (reason) => {
        console.log(reason);
      });
    }
  }

  openBranchesModal(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      const modalRef = this.modalService.open(BranchesModalComponent);
      modalRef.componentInstance.myBranches = this.myBranches;
      modalRef.result.then((result) => {
        if (result) {
          this.myBranches = result;
          console.log(result);
        }
      }, (reason) => {
        console.log(reason);
      });
    } 
  }
}
