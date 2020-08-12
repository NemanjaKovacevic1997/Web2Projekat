import { Airport } from './airport'

export class Flight {
    id: number;
    from: Airport;
    to: Airport;
    takeoffTime: string;
    landingTime: string;
    duration: number;
    length: number;
    cost: number;
    averageRating: number;
    airlineId: number;
    stopsLocations: Array<any>;
  
    constructor() {
    }
  }
  