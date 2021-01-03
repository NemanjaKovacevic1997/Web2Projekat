export class RACReport {
    averageEarningsByDay: number;
    averageEarningsByWeek: number;
    averageEarningsByMonth: number;
    rentedCarsByDay: Array<{date: string, value: number}>;
    earningsByDay: Array<{date: string, value: number}>;
    rentedCarsByWeek: Array<{date: string, value: number}>;
    earningsByWeek: Array<{date: string, value: number}>;
    rentedCarsByMonth: Array<{date: string, value: number}>;
    earningsByMonth: Array<{date: string, value: number}>;
}