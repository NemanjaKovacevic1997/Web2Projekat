export class Airline
{
    name : string;
    address : Address;
    promotionalDescription : string;
    priceList : PriceList;
    businessDestinations : Array<Airport>

    constructor(name : string, address : Address, promotionalDescription : string, priceList : PriceList)
    {
        this.name = name;
        this.address = address;
        this.promotionalDescription = promotionalDescription;
        this.priceList = priceList;
        this.businessDestinations = new Array<Airport>();
    }
}

export class Address
{
    city : string;
    country : string;
    coordinates : Coordinates;

    constructor(city : string, country : string, coordinates : Coordinates)
    {
        this.coordinates = coordinates;
        this.city = city;
        this.country = country;
    }
}

export class Coordinates
{
    x : number;
    y : number;

    constructor(x : number, y : number)
    {
        this.x = x;
        this.y = y;
    }
}

export class Measurement
{
    degrees : number;
    minutes : number;
    seconds : number;

    constructor(degrees : number, minutes : number, seconds : number)
    {
        this.degrees = degrees;
        this.minutes = minutes;
        this.seconds = seconds;
    }
}

export class PriceList
{
    extraCharge10: number;
    extraCharge20: number;
    extraChargeHandLaggage: number;
    handLaggageXYZDimensions: XYZ;

    constructor(extraCharge10: number, extraCharge20: number, extraChargeHandLaggage: number, handLaggageXYZDimensions: XYZ)
    {
        this.extraCharge10 = extraCharge10;
        this.extraCharge20 = extraCharge20;
        this.extraChargeHandLaggage = extraChargeHandLaggage;
        this.handLaggageXYZDimensions = handLaggageXYZDimensions;
    }
}

export class XYZ
{
    X : number;
    Y : number;
    Z : number;

    constructor(X : number, Y : number, Z : number)
    {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
}

export class Airport
{
    name : string;
    address : Address;

    constructor(name : string, address : Address)
    {
        this.name = name;
        this.address = address;
    }
}