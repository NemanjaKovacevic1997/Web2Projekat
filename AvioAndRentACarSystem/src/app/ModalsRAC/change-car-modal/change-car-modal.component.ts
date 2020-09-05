import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-car-modal',
  templateUrl: './change-car-modal.component.html',
  styleUrls: ['./change-car-modal.component.css']
})
export class ChangeCarModalComponent implements OnInit {

  @Input() public model;
  @Input() public mark;
  @Input() public year;
  @Input() public type;
  @Input() public seats;
  @Input() public dailyPrice;
  @Input() public image;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.model);
    this.passEntry.emit(this.mark);
    this.passEntry.emit(this.year);
    this.passEntry.emit(this.type);
    this.passEntry.emit(this.seats);
    this.passEntry.emit(this.dailyPrice);
    this.passEntry.emit(this.image);
    this.activeModal.close(this.model);
    this.activeModal.close(this.mark);
    this.activeModal.close(this.year);
    this.activeModal.close(this.type);
    this.activeModal.close(this.seats);
    this.activeModal.close(this.dailyPrice);
    this.activeModal.close(this.image);
  }

}
