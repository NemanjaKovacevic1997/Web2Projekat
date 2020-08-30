export class Seat{
    row: number;
    column: number;
    class: string;

    constructor(row: number, column: number, classs: string){
        this.row = row;
        this.column = column;
        this.class = classs;
    }
}