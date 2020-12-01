
export class RACService
{
    id: number;
    name: string;
    mainAddress: string;
    promotionalDescription: string;
    rating: number;
    priceList: string;
    logo: string;

    constructor(id?: number, name?: string, mainAddress?: string, promotionalDescription?: string, rating?: number, priceList?: string, logo?: string )
    {
        this.id = id;
        this.name = name;
        this.mainAddress = mainAddress;
        this.promotionalDescription = promotionalDescription;
        this.rating = rating;
        this.priceList = priceList;
        this.logo = logo;
    }
}