
export class Rent
{
    id: number;
    startDate: Date;
    endDate: Date;
    price: number;
    ratingForService: number;
    ratingForCar: number;
    startRACAddressId: number;
    endRACAddtessId: number;
    carId: number;
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
        this.endRACAddtessId = endRACAddressId;
        this.carId = carId;
        this.registeredUserId = registeredUserId;
    }
}