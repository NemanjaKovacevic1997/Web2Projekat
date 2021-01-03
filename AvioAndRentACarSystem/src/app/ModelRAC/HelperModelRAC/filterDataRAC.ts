import { RACAddress } from "../racAddress";

export class FilterDataRAC {
    deliveryAddress: RACAddress;
    returnAddress: RACAddress;
    date1Year: number;
    date1Month: number; 
    date1Day: number;
    date2Year: number;
    date2Month: number;
    date2Day: number;
    time1Hour: number;
    time1Minute: number;
    time2Hour: number;
    time2Minute: number;
    carType: string;
    numberOfPasengers: number;
    minTotalPrice: number;
    maxTotalPrice: number;
  }