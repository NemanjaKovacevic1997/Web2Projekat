import { User } from "../AirlineModel/user";
import { Car } from "./car";
import { RACAddress } from "./racAddress";
import { RACService } from "./racService";

export class Rent
{
    id: number;
    startDate: Date;
    endDate: Date;
    price: number;
    ratingForService: number;
    ratingForCar: number;
    startRACAddressId: number;
    startRACAddress: RACAddress;
    endRACAddressId: number;
    endRACAddress: RACAddress;
    carId: number;
    car: Car;
    rac: RACService;
    registeredUserId: number;

    constructor(id?: number, startDate?: Date, endDate?: Date, price?: number, ratingForService?: number, ratingForCar?: number, startRACAddressId?: number, endRACAddressId?: number, carId?: number, registeredUserId?: number )
    {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.ratingForService = ratingForService;
        this.ratingForCar = ratingForCar;
        this.startRACAddressId = startRACAddressId;
        this.endRACAddressId = endRACAddressId;
        this.carId = carId;
        this.registeredUserId = registeredUserId;
    }
}