import { RACAddress } from "./racAddress";

export class RACService
{
    id: number;
    name: string;
    promotionalDescription: string;
    rating: number;
    priceList: string;
    logo: string;
    mainAddress: RACAddress;

    constructor(id?: number, name?: string, promotionalDescription?: string, rating?: number, priceList?: string, logo?: string )
    {
        this.id = id;
        this.name = name;
        this.promotionalDescription = promotionalDescription;
        this.rating = rating;
        this.priceList = priceList;
        this.logo = logo;
    }
}