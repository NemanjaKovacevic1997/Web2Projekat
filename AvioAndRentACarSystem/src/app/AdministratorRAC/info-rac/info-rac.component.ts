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

@Component({
  selector: 'app-info-rac',
  templateUrl: './info-rac.component.html',
  styleUrls: ['./info-rac.component.css']
})
export class InfoRacComponent implements OnInit {

  myName: string = "Belgrade Rent-a-car";
  myPromotionalDescription: string = "Just say where, we know how!";
  myAddress: string = "Sime Milosevica 23";
  myPriceList: string = "1 day rent = 20$\n, 2 or more days rent = 50$";
  myBranches: string = "Beograd, Pozeska 44\nZemun, Maksima Gorkog 13\nBeograd, Knez Mihajlova 37";
  myRating: number = 7.00;
  myLogo: string = "../../assets/images/rentacar-beograd.png";
  public loginService: LoginService;
  get UserRole() { return UserRole; }

  constructor(private modalService: NgbModal, private imageService: ImageService, loginService: LoginService) {
    this.loginService = loginService;
   }

  ngOnInit(): void {
  }

  onSubmit(){

  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.myLogo = event.target.result.toString();
      }
    }
  }

  openNameRacModal(){
    if(this.loginService.userRole == UserRole.AdminRAC){
      const modalRef = this.modalService.open(NameRacModalComponent);
      modalRef.componentInstance.myName = this.myName;
      modalRef.result.then((result) => {
        if (result) {
          this.myName = result;
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
      modalRef.componentInstance.myPromotionalDescription = this.myPromotionalDescription;
      modalRef.result.then((result) => {
        if (result) {
          this.myPromotionalDescription = result;
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
      modalRef.componentInstance.myAddress = this.myAddress;
      modalRef.result.then((result) => {
        if (result) {
          this.myAddress = result;
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
      modalRef.componentInstance.myPriceList = this.myPriceList;
      modalRef.result.then((result) => {
        if (result) {
          this.myPriceList = result;
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
