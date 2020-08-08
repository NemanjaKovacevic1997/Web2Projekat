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
