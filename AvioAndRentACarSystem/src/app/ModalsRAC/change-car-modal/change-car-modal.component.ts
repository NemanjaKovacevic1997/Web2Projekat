import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-car-modal',
  templateUrl: './change-car-modal.component.html',
  styleUrls: ['./change-car-modal.component.css']
})
export class ChangeCarModalComponent implements OnInit {

  @Input() public myCar;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public model:string;
  public mark:string;
  public year:number;
  public type:string;
  public seats:number;
  public dailyPrice:number;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.model = this.myCar.model;
    this.mark = this.myCar.mark; 
    this.dailyPrice = this.myCar.dailyPrice;
    this.year = this.myCar.year;
    this.seats = this.myCar.seats;
    this.type = this.myCar.type;
  }

  passBack() {
    this.myCar.model = this.model;
    this.myCar.mark = this.mark;
    this.myCar.dailyPrice = this.dailyPrice;
    this.myCar.year = this.year;
    this.myCar.seats = this.seats;
    this.myCar.type = this.type;

    this.passEntry.emit(this.myCar);
    this.activeModal.close(this.myCar);
  }

}
