import { PriceList } from './priceList';
import { Airport } from './airport';
import { Address } from './address';

export class Airline
{
    name: string;
    address: Address;
    promotionalDescription: string;
    priceList: PriceList;
    businessDestinations: Array<Airport>

    constructor(name: string, address: Address, promotionalDescription: string, priceList: PriceList)
    {
        this.name = name;
        this.address = address;
        this.promotionalDescription = promotionalDescription;
        this.priceList = priceList;
        this.businessDestinations = new Array<Airport>();
    }
}