
export class Flight {
    startTimeHours : Number;
    startTimeMinutes : Number;
    landTimeHours : Number;
    landTimeMinutes : Number;
    startDest : string;
    landDest : string;
    stops : Number;
    airline : string;
    cost : Number;
  
    constructor(startTimeH : Number, startTimeM : Number, landTimeH : Number, landTimeM : Number, startDest : string, landDest : string, stops : Number, airline : string, cost : Number) {
      this.startTimeHours = startTimeH;
      this.startTimeMinutes = startTimeM;
      this.landTimeHours = landTimeH;
      this.landTimeMinutes = landTimeM;
      this.startDest = startDest;
      this.landDest = landDest;
      this.stops = stops;
      this.airline = airline;
      this.cost = cost;
    }
  }
  