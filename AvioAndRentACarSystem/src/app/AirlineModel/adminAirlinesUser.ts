import { User } from '../AirlineModel/user';
import { Airline } from './airline';

export class AdminAirlinesUser
{
    id: number;
    airlineServiceId: number;
    airlineService: Airline;
    user: User;

    /*constructor(id?: number, racServiceId?: number )
    {
        this.id = id;
        this.racServiceId = racServiceId;
    }*/
}