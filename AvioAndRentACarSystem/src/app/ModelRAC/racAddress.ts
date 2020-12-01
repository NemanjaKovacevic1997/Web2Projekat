
export class RACAddress
{
    id: number;
    street: string;
    city: string;
    country: string;
    number: number;
    racServiceId: number;

    constructor(id?: number, street?: string, city?: string, country?: string, number?: number, racServiceId?: number )
    {
        this.id = id;
        this.street = street;
        this.city = city;
        this.country = country;
        this.number = number;
        this.racServiceId = racServiceId;
    }
}