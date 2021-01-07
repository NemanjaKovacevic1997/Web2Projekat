import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/Services/Car/car.service';
import { Car } from 'src/app/ModelRAC/car';
import { LoginService } from 'src/app/Services/Login/login.service';
import { AdminRacUserService } from 'src/app/Services/AdminRACUser/admin-rac-user.service';
import { AdminRACUser } from 'src/app/ModelRAC/adminRACUser';

@Component({
  selector: 'app-add-car-rac',
  templateUrl: './add-car-rac.component.html',
  styleUrls: ['./add-car-rac.component.css']
})
export class AddCarRacComponent implements OnInit {

  myModel: string;
  myMark: string;
  myYear: number;
  myType: string;
  mySeats: number;
  myDailyPrice: number;
  myImage: string;
  myRating: number = 0;
  myRented: boolean = false;
  adminRACUser: AdminRACUser;
  public loginService: LoginService;
  
  constructor(private router: Router, private carService: CarService, loginService: LoginService, private adminRACUserService: AdminRacUserService) {
    this.loginService = loginService;
   }

  ngOnInit(): void {
    
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.myImage = event.target.result.toString();
      }
    }
  }

  addCar() {
    if(!this.validationFull()){
      alert("All fields must be provided.");
      return;
    }

    var userId = this.loginService.user.id;
    this.adminRACUserService.getAdminRACUserById(userId).subscribe( ret =>{
      this.adminRACUser = ret as AdminRACUser;
      var car = new Car (0, this.myModel, this.myMark, this.myType, this.myYear, this.mySeats, this.myRating, this.myDailyPrice, this.myImage, this.myRented, this.adminRACUser.racServiceId )
      this.carService.add(car).subscribe(() => 
        alert(car.mark + " " + car.model + " added to database. Please, refresh this page to show up new car.")
        );
    });
  }

  private validationFull() {
    if(this.myModel == undefined || this.myModel == null ||
      this.myMark == undefined || this.myMark == null ||
      this.myYear == undefined || this.myYear == null ||
      this.myType == undefined || this.myType == null ||
      this.mySeats == undefined || this.mySeats == null ||
      this.myImage == undefined || this.myImage == null ||
      this.myRating == undefined || this.myRating == null)
      return false;
    return true;
  }
}