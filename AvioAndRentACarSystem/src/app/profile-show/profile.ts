export class Profile{
    firstName : string;
    lastName : string;
    email : string;
    city : string;
    mobileNumber : string;

    constructor(firstName : string, lastName : string, email : string, city : string, mobileNumber : string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.city = city;
        this.mobileNumber = mobileNumber;
    }
}