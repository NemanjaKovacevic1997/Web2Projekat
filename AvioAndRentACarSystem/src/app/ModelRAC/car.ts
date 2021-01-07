import { RACService } from "./racService";

export class Car
{
    id: number;
    model: string;
    mark: string;
    type: string;
    year: number;
    seats: number;
    rating: number;
    dailyPrice: number;
    image: string;
    rented: boolean;
    racService: RACService;
    racServiceId: number;
    isReservedForRent: boolean;
    quickRented: boolean;
    quickRentDate: Date;
    quickRentDiscount: number;

    constructor(id?: number, model?: string, mark?: string, type?: string, year?: number, seats?: number, rating?: number, dailyPrice?: number, image?: string, rented?: boolean, racServiceId?: number )
    {
        this.id = id;
        this.model = model;
        this.mark = mark;
        this.type = type;
        this.year = year;
        this.seats = seats;
        this.rating = rating;
        this.dailyPrice = dailyPrice;
        this.image = image;
        this.rented = rented;
        this.racServiceId = racServiceId;
    }
}