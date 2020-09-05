import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ImageService } from '../Services/Image/image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeCarModalComponent } from '../ModalsRAC/change-car-modal/change-car-modal.component';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageLightboxComponent implements OnInit {

  images = [];
  slideIndex = 0;

  myModel = "";
  myMark = "";
  myYear = "";
  myType = "";
  mySeats = "";
  myDailyPrice = "";
  myImage = "";  


  constructor(private imageService: ImageService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadImages();
  }

  openChangeCarModal(){
    const modalRef = this.modalService.open(ChangeCarModalComponent);
    modalRef.componentInstance.myAddress = this.myModel;
    modalRef.result.then((result) => {
      if (result) {
        this.myModel = result;
        console.log(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  loadImages(): void {
    this.imageService.fetchImages()
     .subscribe(images => this.images = images);
   }
   openModal() {
    document.getElementById('imgModal').style.display = "block";
   }
   closeModal() {
    document.getElementById('imgModal').style.display = "none";
   }
   plusSlides(n) {
    this.showSlides(this.slideIndex += n);
   }
   currentSlide(n) {
    this.showSlides(this.slideIndex = n);
   }
   showSlides(slideIndex);
   showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf < HTMLElement > ;
    const dots = document.getElementsByClassName("images") as HTMLCollectionOf < HTMLElement > ;
    if (n > slides.length) {
     this.slideIndex = 1
    }
    if (n < 1) {
     this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    if (dots && dots.length > 0) {
     dots[this.slideIndex - 1].className += " active";
    }
  }
}
