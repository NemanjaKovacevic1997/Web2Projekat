import { Address } from '../address';
import { UserRole } from '../userRole';

export class UserWithoutCredentials {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    address: Address;
    mobileNumber: string;
    role: UserRole;
}