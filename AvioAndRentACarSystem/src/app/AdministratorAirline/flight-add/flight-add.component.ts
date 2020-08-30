import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlightAdd } from 'src/app/AirlineModel/HelperModel/flightAdd';
import { Airport } from 'src/app/AirlineModel/airport';
import { Address } from 'src/app/AirlineModel/address';
import { AirportService } from 'src/app/Services/Airport/airport.service';

@Component({
  selector: 'flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css']
})
export class FlightAddComponent implements OnInit {
  @Output() add = new EventEmitter<FlightAdd>();
  
  airports: Array<Airport>;
  flightAdd: FlightAdd;
  minPickerDate;
  selectedAirport: number;
  stopDestinations: Array<Airport>;

  constructor(private airportService: AirportService) { }

  ngOnInit(): void {
    this.stopDestinations = [];
    this.setForm();
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    this.airportService.getAll().subscribe(ret => {
      this.airports = ret as Array<Airport>;
    });
  }

  addFlight(event) {
    event.stopPropagation();
    console.log(this.flightAdd);
    if(!this.validationFull()){
      alert("All fields except stop destinations must be provided.");
      return;
    }

    this.flightAdd.stopDestinations = [];
    for (let i = 0; i < this.stopDestinations.length; i++) {
      this.flightAdd.stopDestinations.push(this.stopDestinations[i].id);
    }
    
    this.add.emit(this.flightAdd);
    console.log(this.flightAdd);
    this.setForm();
  }

  addStopDestination(event) {
    event.stopPropagation();
    if(!this.validationStopDestination()) {
      alert("All fields in airline form must be provided.");
      return;
    }
  
    for (let i = 0; i < this.airports.length; i++) {
      if(this.selectedAirport == this.airports[i].id){
        this.stopDestinations.push(this.airports[i]);
        break;
      }      
    }
  }

  deleteStopDestination(event, id: number) {
    event.stopPropagation();
    for (let i = 0; i < this.stopDestinations.length; i++) {
      let dest = this.stopDestinations[i];
      if(dest.id == id) {
        this.stopDestinations.splice(i, 1);
        return;
      }
    }
  }

  private validationFull() {
    if(this.flightAdd.from == undefined || this.flightAdd.from == null ||
       this.flightAdd.to == undefined || this.flightAdd.to == null ||
       this.flightAdd.depart == undefined ||
       this.flightAdd.land == undefined ||
       this.flightAdd.departTime == undefined ||
       this.flightAdd.landTime == undefined ||
       this.flightAdd.cost == undefined ||
       this.flightAdd.distance == undefined)
       return false;
    return true;
  }

  private validationStopDestination() {
    if(this.selectedAirport == undefined || this.selectedAirport == null)
      return false;
    return true;
  }


  private setForm(){
    this.flightAdd = new FlightAdd();
    this.flightAdd.stopDestinations = new Array<number>();
    this.stopDestinations = [];
  }

  
}
