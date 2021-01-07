import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchesModalComponent } from 'src/app/ModalsRAC/branches-modal/branches-modal.component';
import { AddressRacModalComponent } from 'src/app/ModalsRAC/address-rac-modal/address-rac-modal.component';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserRole } from 'src/app/AirlineModel/userRole';
import { NameRacModalComponent } from 'src/app/ModalsRAC/name-rac-modal/name-rac-modal.component';
import { PromotionalDescriptionRacComponent } from 'src/app/ModalsRAC/promotional-description-rac/promotional-description-rac.component';
import { RacServiceService } from 'src/app/Services/RACService/rac-service.service';
import { RACService } from 'src/app/ModelRAC/racService';
import { ActivatedRoute } from '@angular/router';
import { RacAddressService } from 'src/app/Services/RACAddress/rac-address.service';
import { RACAddress } from 'src/app/ModelRAC/racAddress';
import { RentService } from 'src/app/Services/Rent/rent.service';

@Component({
  selector: 'app-info-rac',
  templateUrl: './info-rac.component.html',
  styleUrls: ['./info-rac.component.css']
})
export class InfoRacComponent implements OnInit {

  public id: number;
  public rac: RACService;
  public loginService: LoginService;
  public racAddresses: Array<RACAddress>;
  public racAddressesOld: Array<RACAddress>;
  public racAddressesNew: Array<RACAddress>;
  public racAddressesDeleted: Array<RACAddress>;
  public mainAddressChanged: boolean;
  public mainAddress: RACAddress;
  public address: RACAddress;
  public priceListForOne: number;
  public priceListForTwo: number;
  public priceListForThree: number;
  public priceListForFour: number;
  public priceListForMore: number;
  public priceStrings: Array<String>;
  public maxId: number;
  get UserRole() { return UserRole; }
  
  constructor(private modalService: NgbModal, private activatedRoute: ActivatedRoute, loginService: LoginService, private racServiceService: RacServiceService, private racAddressService: RacAddressService, private rentService: RentService) {
    this.rac = new RACService();
    this.racAddresses = new Array<RACAddress>();
    this.racAddressesOld = new Array<RACAddress>();
    this.racAddressesNew = new Array<RACAddress>();
    this.racAddressesDeleted = new Array<RACAddress>();
    this.priceStrings = new Array<String>();
    this.mainAddressChanged = false;
    this.maxId = 0;
    this.loginService = loginService;
  }

  ngOnInit(): void {
    this.racAddresses = new Array<RACAddress>();
    this.racAddressesOld = new Array<RACAddress>();
    this.racAddressesNew = new Array<RACAddress>();
    this.racAddressesDeleted = new Array<RACAddress>();
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });

    this.getRACService();
  }

  getRACService(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      this.racServiceService.getAdminRACServiceRACService(this.loginService.user.id).subscribe(ret => { 
        this.rac = ret as RACService

        //GET PRICELIST
        if(this.rac.priceList != "" && this.loginService.userRole == UserRole.AdminRAC){
          let stringParts = this.rac.priceList.split(" ");
          let one = stringParts[3].split("€");
          this.priceListForOne = Number.parseInt(one[0]);
          let two = stringParts[6].split("€");
          this.priceListForTwo = Number.parseInt(two[0]);
          let three = stringParts[9].split("€");
          this.priceListForThree = Number.parseInt(three[0]);
          let four = stringParts[12].split("€");
          this.priceListForFour = Number.parseInt(four[0]);
          let more = stringParts[15].split("€");
          this.priceListForMore = Number.parseInt(more[0]);
        }else{
          this.priceListForOne = 0;
          this.priceListForTwo = 0;
          this.priceListForThree = 0;
          this.priceListForFour = 0;
          this.priceListForMore = 0;
        }

        //GET ADDRESSES
        this.racAddressService.getRACServiceAddresses(this.rac.id).subscribe( ret => {
          this.racAddresses = ret as Array<RACAddress>;  
          this.racAddressesOld = ret as Array<RACAddress>;
          this.racAddresses.forEach(element => {
            if(element.isMain == true)
              this.mainAddress = element;

            this.isAddressRented(element);
          }); 
        });
      });
    }else{
      this.racServiceService.get(this.id).subscribe(ret => {
        this.rac = ret as RACService;

        //GET PRICELIST
        if(this.rac.priceList != ""){
          let stringParts = this.rac.priceList.split("\n");
          let one = stringParts[0] + " (+ car's price.)";
          let two = stringParts[1] + " (+ car's price.)";
          let three = stringParts[2] + " (+ car's price.)";
          let four = stringParts[3] + " (+ car's price.)";
          let more = stringParts[4] + " (+ car's price.)";
          this.priceStrings.push(one,two,three,four,more);
        }else{
          this.priceStrings.push("For one person " + 0 + "€" + " (+ car's price.)",
                           "For two persons " + 0 + "€" + " (+ car's price.)",
                           "For three persons " + 0 + "€" + " (+ car's price.)",
                           "For four persons " + 0 + "€" + " (+ car's price.)",
                           "For more persons " + 0 + "€" + " (+ car's price.)")
          ;
        }
      });

      //GET ADDRESSES
      this.racAddressService.getRACServiceAddresses(this.id).subscribe( ret => {
        this.racAddresses = ret as Array<RACAddress>;  
        this.racAddresses.forEach(element => {
          if(element.isMain == true)
            this.mainAddress = element;
        });  
      });
    }
  }

  isAddressRented(racAddress : RACAddress){
    this.rentService.isAddressRented(racAddress.id).subscribe(ret => {
      racAddress.isUsedForRent = ret as boolean;
    });
  }

  saveChanges() {
    if (confirm('Are you sure you want to save changes?')) {
      this.rac.priceList = "For one person " + this.priceListForOne + "€\n"+
                           "For two persons " + this.priceListForTwo + "€\n"+
                           "For three persons " + this.priceListForThree + "€\n"+
                           "For four persons " + this.priceListForFour + "€\n"+
                           "For more persons " + this.priceListForMore + "€"
      ;
      
      //PROVERA DA LI JE GLAVNA ADRESA IZMENJENA
      if(this.mainAddressChanged){
        this.racAddressService.update(this.mainAddress.id, this.mainAddress).subscribe(()=>{});
      }

      //PROVERA DA LI JE NEKA OD STARIH ADRESA IZBRISANA
      //GET ADDRESSES
      this.racAddressService.getRACServiceAddresses(this.rac.id).subscribe( ret => {
        this.racAddressesOld = ret as Array<RACAddress>;
        this.racAddressesDeleted.forEach(elementDeleted => {
          this.racAddressesOld.forEach(elementOld => {
            if(elementDeleted.id == elementOld.id){
              this.racAddressService.remove(elementOld.id).subscribe(()=>{});
            }
          });
        });
      });

      //UBACIVANJE NOVIH(NEIZBRISANIH) ADRESA
      this.racAddressesNew.forEach(elementNew => {
        let deleted = false;
        this.racAddressesDeleted.forEach(elementDeleted => {
          if(elementDeleted.id == elementNew.id){
            deleted = true;
          }
        });

        if(!deleted)
        {
          elementNew.id = 0;
          elementNew.racServiceId = this.rac.id;
          elementNew.isMain = false;
          this.racAddressService.add(elementNew).subscribe(()=>{});
        }    
      });

      this.racServiceService.update(this.rac.id, this.rac).subscribe(() => {
        alert("Changes are saved successfuly.")
        this.ngOnInit();
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
      modalRef.componentInstance.address = this.mainAddress;
      modalRef.result.then((result) => {
        if (result) {
          this.mainAddress = result;
          this.mainAddressChanged = true;
          console.log(result);
        }
      }, (reason) => {
        console.log(reason);
      });
    }
  }

  openBranchesModal(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      this.address = new RACAddress();
      const modalRef = this.modalService.open(BranchesModalComponent);
      modalRef.componentInstance.address = this.address;
      modalRef.result.then((result) => {
        if (result) {
          this.address = result;
          this.racAddresses.forEach(element => {
            if(element.id > this.maxId)
              this.maxId = element.id;
          });
          this.racAddressesDeleted.forEach(element => {
            if(element.id > this.maxId)
              this.maxId = element.id;
          });
          this.address.id = this.maxId+1;
          this.address.isUsedForRent = false;
          this.racAddresses.push(this.address);
          this.racAddressesNew.push(this.address);
          console.log(result);
        }
      }, (reason) => {
        console.log(reason);
      });
    } 
  }

  deleteAddress(index: number){
    this.racAddressesDeleted.push(this.racAddresses[index]);
    this.racAddresses.splice(index,1);
  }
}