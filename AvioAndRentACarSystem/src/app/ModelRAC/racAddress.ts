
export class RACAddress
{
    id: number;
    street: string;
    city: string;
    country: string;
    number: number;
    racServiceId: number;
    isMain: boolean;

    constructor(id?: number, street?: string, city?: string, country?: string, number?: number, racServiceId?: number, isMain?: boolean )
    {
        this.id = id;
        this.street = street;
        this.city = city;
        this.country = country;
        this.number = number;
        this.racServiceId = racServiceId;
        this.isMain = isMain;
    }
}