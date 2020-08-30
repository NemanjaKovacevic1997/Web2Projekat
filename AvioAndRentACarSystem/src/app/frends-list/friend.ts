import { OnInit } from '@angular/core';
import { UserCurrentFriendshipStatus } from '../AirlineModel/userCurrentFriendshipStatus';

export class Friend  {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    userCurrentFriendshipStatus: UserCurrentFriendshipStatus;
    

    constructor(firstName: string, lastName: string, userCurrentFriendshipStatus: UserCurrentFriendshipStatus, id? : number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.userCurrentFriendshipStatus = userCurrentFriendshipStatus;
        this.id = id;
    }

}