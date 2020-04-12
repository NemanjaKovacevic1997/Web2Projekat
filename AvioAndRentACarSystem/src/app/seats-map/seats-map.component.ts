import { Component, OnInit, Input } from '@angular/core';
import { Seat } from './seat';

@Component({
  selector: 'seats-map',
  templateUrl: './seats-map.component.html',
  styleUrls: ['./seats-map.component.css']
})
export class SeatsMapComponent implements OnInit {
  
  @Input('rows') rows : number;
  @Input('columns') columns : number;
  @Input('bookedSeats') bookedSeats : Array<Seat>;
  myBooking : Array<Seat>;

  constructor() { }

  ngOnInit(): void {
    this.rows = 20;
    this.columns = 9;
    this.myBooking = new Array<Seat>();
  }

  clickedSeat(row, column){
  
    if(this.sholudBeReseved(row, column))
      return;

    let id = this.makeId(row, column);
    let btn = document.getElementById(id);

    if(btn.classList.contains("btn-warning") == true){
      btn.classList.remove("btn-warning");
      btn.classList.add("btn-success");
      let newSeat = new Seat(row, column);
      this.myBooking.push(newSeat);
    }
    else{
      btn.classList.remove("btn-success");
      btn.classList.add("btn-warning");
      this.removeSeatFromBooked(row, column);
    }

    
    /*let id = this.makeId(row, column);
    let btn = document.getElementById(id);

    if(btn.classList.contains("visible") == true){
      btn.classList.remove("visible");
      btn.classList.add("invisiblee");
      alert(btn.classList);
    }
    else{
      btn.classList.remove("invisiblee");
      btn.classList.add("visible");
      alert(btn.classList);
    }*/

  }


  makeId(i, j){
    return i + "" + j;
  }
  counter(i: number) {
    return new Array(i);
  }

  sholudBeReseved(i, j){
    let ret : boolean = false;
    for(let seat of this.bookedSeats){
      if(seat.row == i && seat.column == j){
        ret = true;
        break;
      }
    }
    
    return ret;
  }

  removeSeatFromBooked(row, column){
    let index : number = 0;
    for(let seat of this.myBooking){
      if(seat.row == row && seat.column == column){
        this.myBooking.splice(index,1);
        break;
      }
      index = index + 1;
    }
  }

}
