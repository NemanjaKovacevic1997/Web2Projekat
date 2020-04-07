import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mobile-number-modal',
  templateUrl: './mobile-number-modal.component.html',
  styleUrls: ['./mobile-number-modal.component.css']
})
export class MobileNumberModalComponent implements OnInit {

  @Input() public mobileNumber;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.mobileNumber);
    this.activeModal.close(this.mobileNumber);
  }

}
