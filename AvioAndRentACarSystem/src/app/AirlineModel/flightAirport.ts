import { Flight } from './flight';

export class FlightAirport {
    flightId: number;
    flight: Flight;

    airportId: number;
    airport: number;

    constructor(flightId: number, airportId: number) {
        this.flightId = flightId;
        this.airportId = airportId;
    }
}