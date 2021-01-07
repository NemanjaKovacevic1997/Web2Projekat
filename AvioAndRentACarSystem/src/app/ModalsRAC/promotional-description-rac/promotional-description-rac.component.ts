import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-promotional-description-rac',
  templateUrl: './promotional-description-rac.component.html',
  styleUrls: ['./promotional-description-rac.component.css']
})
export class PromotionalDescriptionRacComponent implements OnInit {

  @Input() public promotionalDescription: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.promotionalDescription);
    this.activeModal.close(this.promotionalDescription);
  }
}