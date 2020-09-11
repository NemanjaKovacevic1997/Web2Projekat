import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ImageService } from '../Services/Image/image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeCarModalComponent } from '../ModalsRAC/change-car-modal/change-car-modal.component';
import { CarService } from '../Services/Car/car.service';
import { Car } from '../ModelRAC/car';
import { LoginService } from '../Services/Login/login.service';
import { UserRole } from '../AirlineModel/userRole';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageLightboxComponent implements OnInit {

  slideIndex = 0;
  public cars: Array<Car>;
  myCar: Car;
  myCarBefore: Car;
  indexOfMyCar: number;
  get UserRole() { return UserRole; }
  public loginService: LoginService;

  constructor(private imageService: ImageService, private modalService: NgbModal, private carService: CarService, loginService: LoginService, private router: Router) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
    this.updateCarList();
  }

  removeCar(id){
    if (confirm('Are you sure you want to remove this car?')) {
      this.carService.remove(id).subscribe(() => this.ngOnInit());
    }  
  }

  updateCarList(){
    this.carService.getAll().subscribe(ret => {
      this.cars = ret as Array<Car>;
    });
  }
  
  saveChanges(id) {
    if (confirm('Are you sure you want to save changes?')) {
      this.carService.update(id, this.myCar).subscribe(() => {
        this.cars[this.indexOfMyCar] = this.myCar;
        alert("Changes are saved successfuly.")
      });
      return;
    }
    this.myCar = this.myCarBefore;
    this.cars[this.indexOfMyCar] = this.myCar;
  }

  openChangeCarModal(id){
    this.myCar =  this.cars.find(x => x.id == id);
    this.myCarBefore = new Car();
    this.myCarBefore.dailyPrice = this.myCar.dailyPrice;
    this.myCarBefore.id = this.myCar.id;
    this.myCarBefore.image = this.myCar.image;
    this.myCarBefore.mark = this.myCar.mark;
    this.myCarBefore.model = this.myCar.model;
    this.myCarBefore.rating = this.myCar.rating;
    this.myCarBefore.seats = this.myCar.seats;
    this.myCarBefore.type = this.myCar.type;
    this.myCarBefore.year = this.myCar.year;
    this.indexOfMyCar = this.cars.findIndex(x => x.id == id);
    const modalRef = this.modalService.open(ChangeCarModalComponent);
    modalRef.componentInstance.myCar = this.myCar;
    modalRef.result.then((result) => {
      if (result) {
        this.myCar = result;
        console.log(result);
        this.saveChanges(id);
      }
    }, (reason) => {
      console.log(reason);
    }); 
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
