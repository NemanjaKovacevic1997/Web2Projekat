export class PriceList
{
    id: number;
    luggageOver10kg: number;
    luggageOver20kg: number;
    handLuggageOverMaxDimensions: number;

    constructor(luggageOver10kg: number, luggageOver20kg: number, handLuggageOverMaxDimensions: number)
    {
        this.luggageOver10kg = luggageOver10kg;
        this.luggageOver20kg = luggageOver20kg;
        this.handLuggageOverMaxDimensions = handLuggageOverMaxDimensions;
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
