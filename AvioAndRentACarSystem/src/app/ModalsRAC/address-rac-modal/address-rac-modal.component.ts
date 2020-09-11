import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address-rac-modal',
  templateUrl: './address-rac-modal.component.html',
  styleUrls: ['./address-rac-modal.component.css']
})
export class AddressRacModalComponent implements OnInit {

  @Input() public address: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.address);
    this.activeModal.close(this.address);
  }

}
