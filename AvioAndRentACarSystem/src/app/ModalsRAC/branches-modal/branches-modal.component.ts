import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-branches-modal',
  templateUrl: './branches-modal.component.html',
  styleUrls: ['./branches-modal.component.css']
})
export class BranchesModalComponent implements OnInit {

  @Input() public address;
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
