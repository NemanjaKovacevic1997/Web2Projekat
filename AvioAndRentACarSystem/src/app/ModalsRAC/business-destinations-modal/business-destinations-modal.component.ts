import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-business-destinations-modal',
  templateUrl: './business-destinations-modal.component.html',
  styleUrls: ['./business-destinations-modal.component.css']
})
export class BusinessDestinationsModalComponent implements OnInit {
  
  @Input() public businessDestination;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public name: string;
  public city: string;
  public country: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  
  }

  passBack() {
    this.businessDestination.name = this.name;
    this.businessDestination.city = this.city;
    this.businessDestination.country = this.country;

    this.passEntry.emit(this.businessDestination);
    this.activeModal.close(this.businessDestination);
  }
}
