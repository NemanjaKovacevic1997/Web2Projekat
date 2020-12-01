import { User } from '../AirlineModel/user';
import { RACService } from './racService';

export class AdminRACUser
{
    id: number;
    racServiceId: number;
    racService: RACService;
    user: User;

    /*constructor(id?: number, racServiceId?: number )
    {
        this.id = id;
        this.racServiceId = racServiceId;
    }*/
}