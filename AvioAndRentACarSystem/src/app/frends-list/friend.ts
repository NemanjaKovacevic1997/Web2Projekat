import { OnInit } from '@angular/core';

export class Friend  {
    firstName : string;
    lastName : string;
    isFriend : boolean;
    isInvitation : boolean;

    constructor(firstName : string, lastName : string, isFriend : boolean, isInvitation : boolean){
        this.firstName = firstName;
        this.lastName = lastName;
        this.isFriend = isFriend;
        if(this.isFriend)
           this.isInvitation = false;
        else 
           this.isInvitation = isInvitation;
    }

}