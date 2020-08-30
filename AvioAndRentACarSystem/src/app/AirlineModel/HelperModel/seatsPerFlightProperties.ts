import { Seat } from 'src/app/AirlineModel/seat';

export class SeatsPerFlightProperties {
    rows: number;
    columns: number;
    bookedSeats: Array<Seat>
    removedSeats: Array<Seat>
    firstClassEndRow: number;
    buisinessClassEndRow: number;
}