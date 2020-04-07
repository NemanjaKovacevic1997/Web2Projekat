import { Component, OnInit, ViewChild } from '@angular/core';
import { Profile } from './profile';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.css']
})
export class ProfileShowComponent implements OnInit {

  myProfile : Profile = new Profile('Nemanja', 'Kovacevic', 'kovacevicnemanja1997@gmail.com', 'Gajdobra', '0604520858');
  closeResult = '';

  constructor(private modalService: NgbModal) { 
    
  }

  ngOnInit(): void {
    
  }

  showModalFirstName()
  {
    
  }

  hideModalFirstName()
  {
  }
    
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdro';
    } else {
      return `with: ${reason}`;
    }
  }
}
