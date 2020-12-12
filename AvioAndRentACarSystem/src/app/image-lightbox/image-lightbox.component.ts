import { Component, Input, OnInit, ViewEncapsulation  } from '@angular/core';
import { ImageService } from '../Services/Image/image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeCarModalComponent } from '../ModalsRAC/change-car-modal/change-car-modal.component';
import { CarService } from '../Services/Car/car.service';
import { Car } from '../ModelRAC/car';
import { LoginService } from '../Services/Login/login.service';
import { UserRole } from '../AirlineModel/userRole';
import { ActivatedRoute, Router } from '@angular/router';
import { RacServiceService } from '../Services/RACService/rac-service.service';
import { RACService } from '../ModelRAC/racService';
import { RentService } from '../Services/Rent/rent.service';
import { Rent } from '../ModelRAC/rent';
import { RentModalComponent } from '../ModalsRAC/rent-modal/rent-modal.component';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageLightboxComponent implements OnInit {

  @Input() public cars: Array<Car>;

  public id: number;
  public rac: RACService;
  public slideIndex = 0;
  public myCar: Car;
  public myCarBefore: Car;
  public indexOfMyCar: number;
  public myRent: Rent;
  public loginService: LoginService;
  get UserRole() { return UserRole; }

  constructor(private imageService: ImageService, private modalService: NgbModal, private carService: CarService, loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute, private racServiceService: RacServiceService, private rentService: RentService) {
    this.loginService = loginService;
    this.rac = new RACService();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });

    if(this.loginService.userRole == UserRole.AdminRAC){
      this.racServiceService.getAdminRACServiceRACService(this.loginService.user.id).subscribe(ret => { 
        this.rac = ret as RACService
      });
    }else{
      this.racServiceService.get(this.id).subscribe(ret => {
        this.rac = ret as RACService;
      });
    } 
  }

  removeCar(id){
    if (confirm('Are you sure you want to remove this car?')) {
      this.carService.remove(id).subscribe(() => this.ngOnInit());
    }  
  }

  updateCarList(){
    this.carService.getRACServiceCars(this.rac.id).subscribe( ret => {
      this.cars = ret as Array<Car>;
    });
  }

  openRentModal(id){ 
    this.myRent = new Rent();
    const modalRef = this.modalService.open(RentModalComponent);
    modalRef.componentInstance.myRent = this.myRent;
    modalRef.componentInstance.racId = this.id;
    modalRef.result.then((result) => {
      if (result) {
        this.myRent = result;
        console.log(result);
        var days = Math.floor((Date.UTC(this.myRent.endDate.getFullYear(), this.myRent.endDate.getMonth(), this.myRent.endDate.getDate()) - Date.UTC(this.myRent.startDate.getFullYear(), this.myRent.startDate.getMonth(), this.myRent.startDate.getDate()) ) /(1000 * 60 * 60 * 24));
        this.myRent.price = days * this.cars.find(x => x.id == id).dailyPrice;
        this.myRent.registeredUserId = this.loginService.user.id;
        this.myRent.carId = id;
        this.rentService.add(this.myRent).subscribe((res: any) => {
            this.router.navigateByUrl("/"+ this.loginService.user.username + '/history');
        });
      }
    }, (reason) => {
      console.log(reason);
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
