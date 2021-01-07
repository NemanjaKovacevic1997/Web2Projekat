import { CompileSummaryKind } from '@angular/compiler';
import { Seat } from './seat';

export class Ticket {
    id: number;
    userId: number;
    row: number;
    column: number; 
    flightId: number;
    seat: Seat;
    cost: number;
    discount: number;
    isAccepted: boolean;
    firstName: string;
    lastName: string;
    passportNumber: string;
    creatorId: number;
    rentId: number;
}