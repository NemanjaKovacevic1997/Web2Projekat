import { UserRole } from './userRole';

export class User{
    firstName : string;
    lastName : string;
    email : string;
    city : string;
    mobileNumber : string;
    password : string;
    userRole: UserRole

    constructor(firstName : string, lastName : string, email : string, city : string, mobileNumber : string, password : string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.city = city;
        this.mobileNumber = mobileNumber;
        this.password = password;
    }
}