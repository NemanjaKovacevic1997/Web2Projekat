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

  public street: string;
  public number: number;
  public city: string;
  public country: string;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.address.street = this.street;
    this.address.number = this.number;
    this.address.city = this.city;
    this.address.country = this.country;

    this.passEntry.emit(this.address);
    this.activeModal.close(this.address);
  }
}
