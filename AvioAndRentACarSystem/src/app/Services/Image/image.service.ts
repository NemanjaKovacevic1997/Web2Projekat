import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images = [
    {
      id: 1,
      url: "/assets/images/car1.jpg",
      url1: "",//slika od pozadi
      url2: "",//slika iznutra
      url3: "",//slika sa strane
      mark: "Mercedes",
      type: "Micro",
      seats: 5,
      rating: 9.00,
      price: 80
    },
    {
      id: 2,
      url: "../../assets/images/car2.jpg",
      url1: "",//slika od pozadi
      url2: "",//slika iznutra
      url3: "",//slika sa strane
      mark: "BMW",
      type: "Sedan",
      seats: 5,
      rating: 10.00,
      price: 150
    },
    {
      id: 3,
      url: "../../assets/images/car3.jpg",
      url1: "",//slika od pozadi
      url2: "",//slika iznutra
      url3: "",//slika sa strane
      mark: "Range Rover",
      type: "SUV",
      seats: 5,
      rating: 9.50,
      price: 150
    },
    {
      id: 4,
      url: "../../assets/images/car4.jpg",
      url1: "",//slika od pozadi
      url2: "",//slika iznutra
      url3: "",//slika sa strane
      mark: "RAM",
      type: "Pickup",
      seats: 5,
      rating: 8.00,
      price: 180
    },
    {
      id: 5,
      url: "../../assets/images/car5.jpg",
      url1: "",//slika od pozadi
      url2: "",//slika iznutra
      url3: "",//slika sa strane
      mark: "Audi",
      type: "Coupe",
      seats: 2,
      rating: 10.00,
      price: 100
    },
    {
      id: 6,
      url: "../../assets/images/car6.jpg",
      url1: "",//slika od pozadi
      url2: "",//slika iznutra
      url3: "",//slika sa strane
      mark: "Renault",
      type: "Micro",
      seats: 5,
      rating: 7.00,
      price: 60
    },
    {
      id: 7,
      url: "../../assets/images/car7.jpg",
      url1: "",//slika od pozadi
      url2: "",//slika iznutra
      url3: "",//slika sa strane
      mark: "BMW",
      type: "SUV",
      seats: 5,
      rating: 9.00,
      price: 200
    },
    {
      id: 8,
      url: "../../assets/images/car8.jpg",
      url1: "",//slika od pozadi
      url2: "",//slika iznutra
      url3: "",//slika sa strane
      mark: "Mercedes",
      type: "Micro",
      seats: 5,
      rating: 6.00,
      price: 50
    }
  ];  

  constructor() { }

  fetchImages(): Observable<any> {
    return of(this.images);
  }
}
