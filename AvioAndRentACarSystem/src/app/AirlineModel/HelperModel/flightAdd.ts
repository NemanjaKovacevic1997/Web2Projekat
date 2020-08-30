import { Airport } from '../airport';


export class FlightAdd {
    from: string;
    to: string;
    depart: { year: number, month: number, day: number };
    land: { year: number, month: number, day: number };
    departTime: { hour: number, minute: number };
    landTime: { hour: number, minute: number };
    distance: number;
    cost: number;
    stopDestinations: Array<number>;
    airlineId: number;
}