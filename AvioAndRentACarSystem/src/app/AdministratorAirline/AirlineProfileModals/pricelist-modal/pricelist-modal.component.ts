import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PriceList } from 'src/app/AirlineModel/priceList';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pricelist-modal',
  templateUrl: './pricelist-modal.component.html',
  styleUrls: ['./pricelist-modal.component.css']
})
export class PricelistModalComponent implements OnInit {
  @Input() public pricelist: PriceList;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.pricelist);
    this.activeModal.close(this.pricelist);
  }
}
