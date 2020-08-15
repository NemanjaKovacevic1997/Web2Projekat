import { PriceList } from './priceList';
import { Airport } from './airport';
import { Address } from './address';

export class Airline
{
    id: number;
    name: string;
    address: Address;
    promotionalDescription: string;
    pricelist: PriceList;
    averageRating: number;
    businessDestinations: Array<Airport>

    constructor(name: string, address: Address, promotionalDescription: string, priceList: PriceList)
    {
        this.name = name;
        this.address = address;
        this.promotionalDescription = promotionalDescription;
        this.pricelist = priceList;
        this.businessDestinations = new Array<Airport>();
    }
}