import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressModalComponent } from 'src/app/ModalsRAC/address-modal/address-modal.component';
import { PriceListModalComponent } from 'src/app/ModalsRAC/price-list-modal/price-list-modal.component';
import { BranchesModalComponent } from 'src/app/ModalsRAC/branches-modal/branches-modal.component';

@Component({
  selector: 'app-info-rac',
  templateUrl: './info-rac.component.html',
  styleUrls: ['./info-rac.component.css']
})
export class InfoRacComponent implements OnInit {

  myAddress: string = "Sime Milosevica 23";
  myPriceList: string = "1 day rent = 20$\n, 2 or more days rent = 50$";
  myBranches: string = "Beograd, Pozeska 44\nZemun, Maksima Gorkog 13\nBeograd, Knez Mihajlova 37";
  myRating: number = 7.00;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openAddressModal(){
    const modalRef = this.modalService.open(AddressModalComponent);
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

  openPriceListModal(){
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

  openBranchesModal(){
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
