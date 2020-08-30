import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-promotional-description-modal',
  templateUrl: './promotional-description-modal.component.html',
  styleUrls: ['./promotional-description-modal.component.css']
})
export class PromotionalDescriptionModalComponent implements OnInit {
  @Input() public description;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.description);
    this.activeModal.close(this.description);
  }

}
