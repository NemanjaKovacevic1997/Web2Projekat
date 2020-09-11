import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-name-rac-modal',
  templateUrl: './name-rac-modal.component.html',
  styleUrls: ['./name-rac-modal.component.css']
})
export class NameRacModalComponent implements OnInit {

  @Input() public name: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.name);
    this.activeModal.close(this.name);
  }

}
