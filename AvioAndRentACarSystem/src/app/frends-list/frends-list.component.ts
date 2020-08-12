import { Component, OnInit, Input } from '@angular/core';
import { Friend } from './friend';
import { RegisteredUserService } from '../Services/RegisteredUser/registeredUser.service';
import { LoginService } from '../Services/Login/login.service';
import { User } from '../AirlineModel/user';
import { UserCurrentFriendshipStatus } from '../AirlineModel/userCurrentFriendshipStatus';
import { FriendshipRequestService } from '../Services/FriendshipRequest/friendship-request.service';
import { FriendshipRequest } from '../AirlineModel/friendshipRequest';
import { FriendshipService } from '../Services/Friendship/friendship.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'frends-list',
  templateUrl: './frends-list.component.html',
  styleUrls: ['./frends-list.component.css']
})
export class FrendsListComponent implements OnInit {

  friends: Friend[];
  friendsAll: Friend[];
  get UserCurrentFriendshipStatus() { return UserCurrentFriendshipStatus; }
  private currentActive = "all";

  @Input()
  set all(value: boolean) {
    if(!value)
      return;

    this.currentActive = "all";
    this.friends = [];
    for (let i = 0; i < this.friendsAll.length; i++) {
      this.friends.push(this.friendsAll[i]);
    }
  }
  @Input()
  set friendsOnly(value: boolean) {
    if(!value)
      return;

    this.currentActive = "friendsOnly";
    this.friends = [];
    for (let i = 0; i < this.friendsAll.length; i++) {
      if(this.friendsAll[i].userCurrentFriendshipStatus == UserCurrentFriendshipStatus.Friend)
        this.friends.push(this.friendsAll[i]);
    }
  }
  @Input()
  set friendshipEventsOnly(value: boolean) {
    if(!value)
      return;

    this.currentActive = "friendshipEventsOnly";
    this.friends = [];
    for (let i = 0; i < this.friendsAll.length; i++) {
      if(this.friendsAll[i].userCurrentFriendshipStatus == UserCurrentFriendshipStatus.FriendshipRequestSent || 
         this.friendsAll[i].userCurrentFriendshipStatus == UserCurrentFriendshipStatus.FriendshipRequestRecieved)
        this.friends.push(this.friendsAll[i]);
    }
  }

  @Input()
  set searchInput(input: string) {
    this.search(input);
  }


  isActiveFirstName: boolean;
  isActiveLastName: boolean;

  constructor(private loginService: LoginService, 
              private registeredUserService: RegisteredUserService, 
              private friendshipRequestService: FriendshipRequestService,
              private friendshipService: FriendshipService) { 
    this.friends = [];
    this.friendsAll = [];
  }

  ngOnInit(): void {
    this.isActiveFirstName = true;
    this.isActiveLastName = false;

    let id = this.loginService.user.id;
    this.registeredUserService.getUsersWithSenderStatus(id).subscribe(ret => {
      let usersWithStatus = ret as {user: User, currentFriendshipStatus: UserCurrentFriendshipStatus}[];
      
      this.friends = [];
      this.friendsAll = [];
      for (let index = 0; index < usersWithStatus.length; index++) {
        let friend = new Friend(usersWithStatus[index].user.firstName, usersWithStatus[index].user.lastName, usersWithStatus[index].currentFriendshipStatus, usersWithStatus[index].user.id);
        this.friends.push(friend);
        this.friendsAll.push(friend);
      }
    })
  }
  
  removeFromFriendsClick(id: number) {
    let id1 = this.loginService.user.id;
    this.friendshipService.deleteFrendship(id1, id).subscribe(() => this.ngOnInit());
  }

  sendRequestClick(id: number) {
    let fromId = this.loginService.user.id;
    let fr = new FriendshipRequest(0, fromId, id);
    this.friendshipRequestService.add(fr).subscribe(() => this.ngOnInit());
  }

  acceptRequestClick(id: number) {
    let toId = this.loginService.user.id;
    this.friendshipRequestService.acceptRequest(id, toId).subscribe(() => this.ngOnInit());
  }

  refuseRequestClick(id: number) {
    let toId = this.loginService.user.id;
    this.friendshipRequestService.refuseRequest(id, toId).subscribe(() => this.ngOnInit());
  }

  sortByFirstName() {
    this.isActiveFirstName = true;
    this.isActiveLastName = false;
    this.friends.sort(this.compareFirstName);
  }

  sortByLastName() {
    this.isActiveFirstName = false;
    this.isActiveLastName = true;
    this.friends.sort(this.compareLastName);
  }

  private compareFirstName( a: Friend, b: Friend ) {
    if ( a.firstName < b.firstName ){
      return -1;
    }
    if ( a.firstName > b.firstName ){
      return 1;
    }
    return 0;
  }

  private compareLastName( a: Friend, b: Friend ) {
    if ( a.lastName < b.lastName ){
      return -1;
    }
    if ( a.lastName > b.lastName ){
      return 1;
    }
    return 0;
  }

  private search(input: string) {
    if(input == undefined)
      return;

    if(this.currentActive == "friendsOnly")
      this.friendsOnly = true;
    else if(this.currentActive == "all") 
      this.all = true;
    else
      this.friendshipEventsOnly = true;

    if(input.trim() == "")
      return;
    const friendsCloned: Friend[] = cloneDeep(this.friends);
    this.friends = []
    for (let i = 0; i < friendsCloned.length; i++) {
      let friend = friendsCloned[i];
      let firstAndLastName = friend.firstName + " " + friend.lastName;
      if(firstAndLastName.toLowerCase().includes(input.toLowerCase()))
        this.friends.push(friend);
    }
  }

}
