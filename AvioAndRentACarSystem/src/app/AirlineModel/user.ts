import { UserRole } from './userRole';
import { Address } from '../AdministratorAirline/airline-profile/airline';
import { NumberValueAccessor } from '@angular/forms';

export class User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    mobileNumber : string;
    password : string;
    role: UserRole;
    username: string;

    constructor(firstName: string, lastName: string, email: string, address: Address, mobileNumber: string, password: string, role: UserRole, username: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.mobileNumber = mobileNumber;
        this.password = password;
        this.username = username;
        this.role = role;
    }
}