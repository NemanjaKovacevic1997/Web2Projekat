import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Seat } from 'src/app/AirlineModel/seat';

@Component({
  selector: 'seat-map-admin',
  templateUrl: './seat-map-admin.component.html',
  styleUrls: ['./seat-map-admin.component.css']
})
export class SeatMapAdminComponent implements OnInit {
  @Input('rows') rows: number;
  @Input('columns') columns: number;
  @Input('bookedSeats') bookedSeats: Array<Seat>;
  @Input('removedSeats') removedSeats: Array<Seat>;
  @Input('firstClassEndRow') firstClassEndRow: number;
  @Input('buisinessClassEndRow') buisinessClassEndRow: number;
  @Input('maximumSeatsToBook') maximumSeatsToBook: number;

  myBooking: Array<Seat>;
  @Output() change = new EventEmitter<Array<Seat>>();

  private firstClassColor = "btn-dark";
  private buisinessClassColor = "btn-secondary";
  private economyClassColor = "btn-info";
  private selectedColor = "btn-success";
  private imposibbleToSelect = "btn-danger";
  private invisible = "invisiblee";
  private visible = "visible";

  constructor() { }

  ngOnInit(): void {
    this.myBooking = new Array<Seat>();
  }

  clickedSeat(row, column){
    if(this.isTaken(row, column))
      return;

    let id = this.makeId(row, column);
    let btn = document.getElementById(id);

    if(btn.classList.contains(this.visible) == true){
      btn.classList.remove(this.visible);
      btn.classList.add(this.invisible);
      let newSeat = new Seat(row, column, this.getInitialClass(row));
      this.myBooking.push(newSeat);
      this.change.emit(this.myBooking);
    }
    else if(btn.classList.contains(this.invisible) == true){
      btn.classList.remove(this.invisible);
      btn.classList.add(this.visible);   
      this.removeSeatFromBooked(row, column);
      this.change.emit(this.myBooking);
    }
  }


  makeId(i, j){
    return i + "" + j;
  }
  counter(i: number) {
    return new Array(i);
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
    let index : number = 0;
    for(let seat of this.myBooking){
      if(seat.row == row && seat.column == column){
        this.myBooking.splice(index, 1);
        break;
      }
      index = index + 1;
    }
  }

  private getInitialClass(row){
    if(row <= this.firstClassEndRow)
      return "First";
    if(row <= this.buisinessClassEndRow)
      return "Business"
    
    return "Economy";
  }
}