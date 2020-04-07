import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-first-name-modal',
  templateUrl: './first-name-modal.component.html',
  styleUrls: ['./first-name-modal.component.css']
})
export class FirstNameModalComponent implements OnInit {

  @Input() public firstName;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.firstName);
    this.activeModal.close(this.firstName);
  }
}
