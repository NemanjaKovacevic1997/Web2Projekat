
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

    constructor(id?: number, model?: string, mark?: string, type?: string, year?: number, seats?: number, rating?: number, dailyPrice?: number, image?: string )
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
    }
}