import { Injectable } from '@angular/core';
import { SerachData } from 'src/app/AirlineModel/HelperModel/searchData';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  searchData: SerachData;

  constructor() { 
    this.searchData = new SerachData();
  }

  getSearchData(from, to, date1, date2, tripType, people, classType) {
    this.searchData = new SerachData();
    this.searchData.from = from;
    this.searchData.to = to;
    this.searchData.date1Year = date1.year;
    this.searchData.date1Month = date1.month;
    this.searchData.date1Day = date1.day;
    this.searchData.date2Year = date2.year;
    this.searchData.date2Month = date2.month;
    this.searchData.date2Day = date2.day;
    this.searchData.people = people;

    if(tripType == null)
      this.searchData.tripType = "None";
    else
      this.searchData.tripType = tripType;
    
    if(classType == null)
      this.searchData.airplaneClass = "None";
    else
      this.searchData.airplaneClass = classType;
  }

}
