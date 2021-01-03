import { Component, OnInit } from '@angular/core';
import { SearchDataRAC } from '../ModelRAC/HelperModelRAC/searchDataRAC';
import { RACAddress } from '../ModelRAC/racAddress';
import { RACService } from '../ModelRAC/racService';
import { RacAddressService } from '../Services/RACAddress/rac-address.service';
import { RacServiceService } from '../Services/RACService/rac-service.service';
import { RentService } from '../Services/Rent/rent.service';

@Component({
  selector: 'rent-a-car-search',
  templateUrl: './rent-a-car-search.component.html',
  styleUrls: ['./rent-a-car-search.component.css']
})
export class RentACarSearchComponent implements OnInit {
  
  racServices: Array<RACService>;
  racServicesAll: Array<RACService>;

  constructor(private racServiceService: RacServiceService, private rentService: RentService, private racAddressService: RacAddressService) { }

  ngOnInit(): void {
    this.racServiceService.getAll().subscribe(res => {
      this.racServices = res as Array<RACService>;
      this.racServicesAll = res as Array<RACService>;
      this.racServicesAll.forEach(element => {
        this.racAddressService.getRACServiceMainAddress(element.id).subscribe(ret => {
          element.mainAddress = ret as RACAddress;
        });
      });
    })
  }

  fetchFilterData(filterData: SearchDataRAC) {
    let racServicesFiltered: Array<RACService> = [];
    this.rentService.notRentedServicesInSomeDateRange(filterData.date1Year,filterData.date1Month+1,filterData.date1Day,filterData.time1Hour-1,filterData.time1Minute, filterData.date2Year,filterData.date2Month+1,filterData.date2Day,filterData.time2Hour-1,filterData.time2Minute).subscribe(ret => {
      racServicesFiltered = ret as Array<RACService>;
      var i = racServicesFiltered.length;
      while (i--) {
        let rac = racServicesFiltered[i];
        this.racServicesAll.forEach(element => {
          if(element.id == rac.id)
            rac.mainAddress = element.mainAddress;
        });
        if(filterData.nameOfService != undefined){
          if(filterData.location.id == null){
            if((rac.name.includes(filterData.nameOfService))==false){
              racServicesFiltered.splice(i, 1);
              continue;   
            }
          }
          else{
            if((rac.name.includes(filterData.nameOfService))==false || rac.mainAddress.city != filterData.location.city){
              racServicesFiltered.splice(i, 1);
              continue;   
            }
          } 
        }
      }
      this.racServices = racServicesFiltered;
    });
  }
}