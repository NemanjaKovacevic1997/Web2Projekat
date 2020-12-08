import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { SearchDataRAC } from '../ModelRAC/HelperModelRAC/searchDataRAC';
import { RACAddress } from '../ModelRAC/racAddress';
import { RACService } from '../ModelRAC/racService';
import { RacAddressService } from '../Services/RACAddress/rac-address.service';
import { RacServiceService } from '../Services/RACService/rac-service.service';

@Component({
  selector: 'rent-a-car-search',
  templateUrl: './rent-a-car-search.component.html',
  styleUrls: ['./rent-a-car-search.component.css']
})
export class RentACarSearchComponent implements OnInit {
  
  racServices: Array<RACService>;
  racServicesAll: Array<RACService>;
  searchClicked: boolean = false;

  constructor(private racServiceService: RacServiceService) { }

  ngOnInit(): void {
    this.racServiceService.getAll().subscribe(res => {
      this.racServices = res as Array<RACService>;
      this.racServicesAll = res as Array<RACService>;
    })
  }

  fetchFilterData(filterData: SearchDataRAC) {
    if(this.searchClicked){
      
    }
    console.log(filterData.nameOfService);
      let racServicesAllCloned: Array<RACService> = [];
      for(let rac of this.racServicesAll) {
        racServicesAllCloned.push(rac);
      }
    
      var i = racServicesAllCloned.length;
      while (i--) {
        let rac = racServicesAllCloned[i];
        if(filterData.nameOfService != undefined){
          if(rac.name != filterData.nameOfService){
            racServicesAllCloned.splice(i, 1);
            continue;
          }
        }
      }

      this.racServices = racServicesAllCloned;
  }
}
