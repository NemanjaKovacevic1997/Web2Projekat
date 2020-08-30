import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from '../AirlineProfileModals/name-modal/name-modal.component';
import { Airline } from 'src/app/AirlineModel/airline';
import { AirlineService } from 'src/app/Services/Airline/airline.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { AddressModalComponent } from '../AirlineProfileModals/address-modal/address-modal.component';
import { PromotionalDescriptionModalComponent } from '../AirlineProfileModals/promotional-description-modal/promotional-description-modal.component';
import { PricelistModalComponent } from '../AirlineProfileModals/pricelist-modal/pricelist-modal.component';
import { Airport } from 'src/app/AirlineModel/airport';
import { Address } from 'src/app/AirlineModel/address';
import { AirlineAirport } from 'src/app/AirlineModel/airlineAirport';
import { FlightService } from 'src/app/Services/Flights/flight.service';
import { Flight } from 'src/app/AirlineModel/flight';
declare var require: any;

@Component({
  selector: 'app-airline-profile',
  templateUrl: './airline-profile.component.html',
  styleUrls: ['./airline-profile.component.css']
})
export class AirlineProfileComponent implements OnInit {
  airline: Airline;
  currentAirport: Airport;

  constructor(private modalService: NgbModal,
    private airlineService: AirlineService,
    private loginService: LoginService,
    ) { }

  ngOnInit(): void {
    this.currentAirport = new Airport('', new Address(undefined, '', ''));
    this.airlineService.getAdminAirlinesAirline(this.loginService.user.id).subscribe(ret => {
      this.airline = ret as Airline;
    });
  }

  addBusinessDestination() {
    if(this.currentAirport.name.trim() == '' || this.currentAirport.address.city.trim() == '' || this.currentAirport.address.country.trim() == ''){
      alert("All fields of business destination(airport) must not be empty.");
      return;
    }

    if(this.airline.businessDestinations == undefined)
      this.airline.businessDestinations = [];
    let aa = new AirlineAirport();
    let airport = new Airport(this.currentAirport.name,
       new Address(undefined, this.currentAirport.address.city, this.currentAirport.address.country))
    aa.airport = airport;
    this.airline.businessDestinations.push(aa);

    this.currentAirport.name = '';
    this.currentAirport.address.city = '';
    this.currentAirport.address.country = '';
  }


  openNameModal() {
    const modalRef = this.modalService.open(NameModalComponent);
    modalRef.componentInstance.name = this.airline.name;
    modalRef.result.then((result) => {
      if (result) {
        this.airline.name = result;
        //pozovi funkciju za put na server
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  openPromotionalDescriptionModal() {
    const modalRef = this.modalService.open(PromotionalDescriptionModalComponent);
    modalRef.componentInstance.description = this.airline.promotionalDescription;
    modalRef.result.then((result) => {
      if (result) {
        this.airline.promotionalDescription = result;
        //pozovi funkciju za put na server
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }


  openAddressModal() {
    const modalRef = this.modalService.open(AddressModalComponent);
    modalRef.componentInstance.address = this.airline.address;
    modalRef.result.then((result) => {
      if (result) {
        this.airline.address = result;
        //pozovi funkciju za put na server
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  openPricelistModal() {
    const modalRef = this.modalService.open(PricelistModalComponent);
    modalRef.componentInstance.pricelist = this.airline.pricelist;
    modalRef.result.then((result) => {
      if (result) {
        this.airline.pricelist = result;
        //pozovi funkciju za put na server
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  

}
