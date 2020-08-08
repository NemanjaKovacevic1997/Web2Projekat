export class Address
{
    id: number;
    city: string;
    country: string;
    x: number;
    y: number;

    constructor(id: number, city: string, country: string, x?: number, y?: number)
    {
        this.id = id;
        this.city = city;
        this.country = country;
        this.x = x;
        this.y = y; 
    }
}