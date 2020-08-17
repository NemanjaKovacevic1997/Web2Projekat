import { Component, OnInit } from '@angular/core';
import { Friend } from '../frends-list/friend';
import { UserCurrentFriendshipStatus } from '../AirlineModel/userCurrentFriendshipStatus';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  f1 : Friend = new Friend('Marko', 'Sutic', UserCurrentFriendshipStatus.FriendshipRequestSent);
  f2 : Friend = new Friend('Rasa', 'Trudic', UserCurrentFriendshipStatus.Friend);
  f3 : Friend = new Friend('Radisa', 'Trajkovic', UserCurrentFriendshipStatus.NotFriend);
  f4 : Friend = new Friend('Mitar', 'Miric', UserCurrentFriendshipStatus.FriendshipRequestRecieved);

  friends = [this.f1, this.f2, this.f3, this.f4];
  
  constructor() { }

  ngOnInit(): void {
  }

}
