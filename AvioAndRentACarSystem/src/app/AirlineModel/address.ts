export class Address
{
    id: number;
    city: string;
    country: string;
    longitude: number;
    latitude: number;

    constructor(id: number, city: string, country: string, longitude?: number, latitude?: number)
    {
        this.id = id;
        this.city = city;
        this.country = country;
        this.longitude = longitude;
        this.latitude = latitude; 
    }
}