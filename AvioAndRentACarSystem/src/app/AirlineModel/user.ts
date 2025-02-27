import { UserRole } from './userRole';
import { Address } from './address';

export class User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    addressId: number;
    mobileNumber : string;
    password : string;
    role: UserRole;
    username: string;

    constructor(firstName?: string, lastName?: string, email?: string, mobileNumber?: string, password?: string, role?: UserRole, username?: string, address?: Address, addressId?: number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.addressId = addressId;
        this.mobileNumber = mobileNumber;
        this.password = password;
        this.username = username;
        this.role = role;
    }
}