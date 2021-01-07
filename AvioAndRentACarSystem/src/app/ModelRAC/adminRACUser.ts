import { User } from '../AirlineModel/user';
import { RACService } from './racService';

export class AdminRACUser
{
    id: number;
    racServiceId: number;
    racService: RACService;
    user: User;
}