export class FlightToSend {
    fromId: number;
    toId: number;
    takeoffYear: number;
    takeoffMonth: number;
    takeoffDay: number;
    takeoffHours: number;
    takeoffMinutes: number;
    landingYear: number;
    landingMonth: number;
    landingDay: number;
    landingHours: number;
    landingMinutes: number;
    length: number;
    cost: number;
    airlineId: number;
    stopsLocationsIds: Array<number>;
}