import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Seat } from '../AirlineModel/seat';

@Component({
  selector: 'seats-map',
  templateUrl: './seats-map.component.html',
  styleUrls: ['./seats-map.component.css']
})
export class SeatsMapComponent implements OnInit {
  
  @Input('rows') rows: number;
  @Input('columns') columns: number;
  @Input('bookedSeats') bookedSeats: Array<Seat>;
  @Input('removedSeats') removedSeats: Array<Seat>;
  @Input('firstClassEndRow') firstClassEndRow: number;
  @Input('buisinessClassEndRow') buisinessClassEndRow: number;
  @Input('maximumSeatsToBook') maximumSeatsToBook: number;

  myBooking: Array<Seat>;
  @Output() change = new EventEmitter<Array<Seat>>();

  private bookCounter: number;
  private firstClassColor = "btn-dark";
  private buisinessClassColor = "btn-secondary";
  private economyClassColor = "btn-info";
  private selectedColor = "btn-success";
  private imposibbleToSelect = "btn-danger";

  constructor() { }

  ngOnInit(): void {
    this.myBooking = new Array<Seat>();
    this.bookCounter = 0;
  }

  clickedSeat(row, column){
    if(this.isTaken(row, column) || this.isRemoved(row, column))
      return;

    let id = this.makeId(row, column);
    let btn = document.getElementById(id);

    if(btn.classList.contains(this.firstClassColor) == true){
      if(this.bookCounter >= this.maximumSeatsToBook){
        alert("All planed seats are taken");
        return;
      }

      btn.classList.remove(this.firstClassColor);
      btn.classList.add(this.selectedColor);
      let newSeat = new Seat(row, column, "First");
      this.myBooking.push(newSeat);
      this.bookCounter = this.bookCounter + 1;
      this.change.emit(this.myBooking);
    }
    else if(btn.classList.contains(this.buisinessClassColor) == true){
      if(this.bookCounter >= this.maximumSeatsToBook){
        alert("All planed seats are taken");
        return;
      }

      btn.classList.remove(this.buisinessClassColor);
      btn.classList.add(this.selectedColor);
      let newSeat = new Seat(row, column, "Business");
      this.myBooking.push(newSeat);
      this.bookCounter = this.bookCounter + 1;
      this.change.emit(this.myBooking);
    }
    else if(btn.classList.contains(this.economyClassColor) == true){
      if(this.bookCounter >= this.maximumSeatsToBook){
        alert("All planed seats are taken");
        return;
      }

      btn.classList.remove(this.economyClassColor);
      btn.classList.add(this.selectedColor);
      let newSeat = new Seat(row, column, "Economy");
      this.myBooking.push(newSeat);
      this.bookCounter = this.bookCounter + 1;
      this.change.emit(this.myBooking);
    }
    else if(btn.classList.contains(this.selectedColor) == true) {
      btn.classList.remove(this.selectedColor);
      btn.classList.add(this.getInitialColor(row));
      this.removeSeatFromBooked(row, column);
      this.bookCounter = this.bookCounter - 1;
      this.change.emit(this.myBooking);
    }
  }


  makeId(i, j){
    return i + "" + j;
  }
  counter(i: number) {
    return new Array(i);
  }

  sholudBeReseved(i, j){
    let ret: boolean = false;
    for(let seat of this.bookedSeats){
      if(seat.row == i && seat.column == j){
        ret = true;
        break;
      }
    }
    
    return ret;
  }

  isRemoved(i: number, j: number) {
    let ret: boolean = false;
    for(let seat of this.removedSeats){
      if(seat.row == i && seat.column == j){
        ret = true;
        break;
      }
    }
    
    return ret;
  }

  isTaken(i: number, j: number) {
    let ret: boolean = false;
    for(let seat of this.bookedSeats){
      if(seat.row == i && seat.column == j){
        ret = true;
        break;
      }
    }
    
    return ret;
  }

  removeSeatFromBooked(row, column){
    let index: number = 0;
    for(let seat of this.myBooking){
      if(seat.row == row && seat.column == column){
        this.myBooking.splice(index, 1);
        break;
      }
      index = index + 1;
    }
  }

  private getInitialColor(row) {
    if(row <= this.firstClassEndRow)
      return this.firstClassColor;
    if(row <= this.buisinessClassEndRow)
      return this.buisinessClassColor;
    
    return this.economyClassColor;
  }

}
