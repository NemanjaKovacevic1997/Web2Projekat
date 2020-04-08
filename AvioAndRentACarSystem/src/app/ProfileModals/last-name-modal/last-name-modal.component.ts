import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-last-name-modal',
  templateUrl: './last-name-modal.component.html',
  styleUrls: ['./last-name-modal.component.css']
})
export class LastNameModalComponent implements OnInit {

  @Input() public lastName;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.lastName);
    this.activeModal.close(this.lastName);
  }

}
