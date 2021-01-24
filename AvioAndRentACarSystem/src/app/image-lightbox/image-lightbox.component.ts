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
import { RacAddressService } from '../Services/RACAddress/rac-address.service';
import { QuickRentAdminModalComponent } from '../ModalsRAC/quick-rent-admin-modal/quick-rent-admin-modal.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
  public quickRentCar: Car;
  public indexOfMyCar: number;
  public myRent: Rent;
  public allRents: Array<Rent>;
  public loginService: LoginService;
  public priceListForOne: number;
  public priceListForTwo: number;
  public priceListForThree: number;
  public priceListForFour: number;
  public priceListForMore: number;
  get UserRole() { return UserRole; }

  constructor(private imageService: ImageService, private modalService: NgbModal, private carService: CarService, loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute, private racServiceService: RacServiceService, private rentService: RentService, private racAddressService: RacAddressService) {
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

        //GET PRICELIST
        if(this.rac.priceList != ""){
          let stringParts = this.rac.priceList.split(" ");
          let one = stringParts[3].split("€");
          this.priceListForOne = Number.parseInt(one[0]);
          let two = stringParts[6].split("€");
          this.priceListForTwo = Number.parseInt(two[0]);
          let three = stringParts[9].split("€");
          this.priceListForThree = Number.parseInt(three[0]);
          let four = stringParts[12].split("€");
          this.priceListForFour = Number.parseInt(four[0]);
          let more = stringParts[15].split("€");
          this.priceListForMore = Number.parseInt(more[0]);
        }else{
          this.priceListForOne = 0;
          this.priceListForTwo = 0;
          this.priceListForThree = 0;
          this.priceListForFour = 0;
          this.priceListForMore = 0;
        }
      });
    }else{
      this.racServiceService.get(this.id).subscribe(ret => {
        this.rac = ret as RACService;

        //GET PRICELIST
        if(this.rac.priceList != ""){
          let stringParts = this.rac.priceList.split(" ");
          let one = stringParts[3].split("€");
          this.priceListForOne = Number.parseInt(one[0]);
          let two = stringParts[6].split("€");
          this.priceListForTwo = Number.parseInt(two[0]);
          let three = stringParts[9].split("€");
          this.priceListForThree = Number.parseInt(three[0]);
          let four = stringParts[12].split("€");
          this.priceListForFour = Number.parseInt(four[0]);
          let more = stringParts[15].split("€");
          this.priceListForMore = Number.parseInt(more[0]);
        }else{
          this.priceListForOne = 0;
          this.priceListForTwo = 0;
          this.priceListForThree = 0;
          this.priceListForFour = 0;
          this.priceListForMore = 0;
        }
      });
    } 

    this.rentService.getAll().subscribe(res => {
      this.allRents = res as Array<Rent>;      
    });
  }

  openQuickRentAdminModal(id){
    this.quickRentCar = this.cars.find(x=>x.id == id);
    const modalRef = this.modalService.open(QuickRentAdminModalComponent);
    modalRef.componentInstance.quickRentCar = this.quickRentCar;
    modalRef.result.then((result) => {
      if (result) {
        this.quickRentCar = result;
        this.quickRentCar.quickRented = true;
        this.carService.update(this.quickRentCar.id, this.quickRentCar).subscribe(() => this.ngOnInit());
      }
    }, (reason) => {
      console.log(reason);
    }); 
  }

  removeCar(id){
    if (confirm('Are you sure you want to remove this car?')) {
      this.carService.remove(id).subscribe(() => this.ngOnInit() , (error:HttpErrorResponse) => {
        alert(error.error);
      });
    }  
  }

  updateCarList(){
    this.carService.getRACServiceCars(this.rac.id).subscribe( ret => {
      this.cars = ret as Array<Car>;
    });
  }

  isRented(carId): boolean {
    let rented = false;
    let rents = new Array<Rent>();
    this.allRents.forEach(element => {
      if(element.carId == carId)
        rents.push(element);
    });

    let now = new Date();

    rents.forEach(element => {
      let startDate = new Date(element.startDate);
      let endDate = new Date(element.endDate);
      if(startDate.getTime() < now.getTime() && endDate.getTime() > now.getTime())
        rented = true;
    });

    return rented;
  }

  openRentModal(id: number, car: Car){ 
    this.myRent = new Rent();
    this.myRent.carId = id;
    this.myRent.car = car;
    const modalRef = this.modalService.open(RentModalComponent);
    modalRef.componentInstance.myRent = this.myRent;
    modalRef.componentInstance.racId = this.id;
    modalRef.result.then((result) => {
      if (result) {
        this.myRent = result;
        console.log(result);
        let days = Math.floor((Date.UTC(this.myRent.endDate.getFullYear(), this.myRent.endDate.getMonth(), this.myRent.endDate.getDate()) - Date.UTC(this.myRent.startDate.getFullYear(), this.myRent.startDate.getMonth(), this.myRent.startDate.getDate()) ) /(1000 * 60 * 60 * 24));
        if(days == 0)
          this.myRent.price = this.cars.find(x => x.id == id).dailyPrice + this.getPriceForNumberOfUsers(this.myRent.numberOfUsers);
        else
          this.myRent.price = days * this.cars.find(x => x.id == id).dailyPrice + this.getPriceForNumberOfUsers(this.myRent.numberOfUsers);
        this.myRent.registeredUserId = this.loginService.user.id;
        this.myRent.carId = id;
        this.myRent.car = undefined;
        this.rentService.add(this.myRent).subscribe((res: any) => {
            this.router.navigateByUrl("/"+ this.loginService.user.username + '/history');
        }, (error:HttpErrorResponse) => {
            alert(error.error);
        });
      }
    }, (reason) => {
      console.log(reason);
    }); 
  }
  
  getPriceForNumberOfUsers(numberOfUsers: number) :number{
    let count = 0;
    if(numberOfUsers == 1)
      return count = this.priceListForOne;
    else if(numberOfUsers == 2)
      return count = this.priceListForTwo;
    else if(numberOfUsers == 3)
      return count = this.priceListForThree;
    else if(numberOfUsers == 4)
      return count = this.priceListForFour;
    else
      return count = this.priceListForMore;
  }

  saveChanges(id) {
    if (confirm('Are you sure you want to save changes?')) {
      this.carService.update(id, this.myCar).subscribe(() => {
        this.cars[this.indexOfMyCar] = this.myCar;
        alert("Changes are saved successfuly.")
      }, (error:HttpErrorResponse) => {
        alert(error.error);
        this.myCar = this.myCarBefore;
        this.cars[this.indexOfMyCar] = this.myCar;
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

  //METODE ZA PRIKAZ SLIKA
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