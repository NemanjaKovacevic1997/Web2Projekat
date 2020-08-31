import { Component, OnInit } from '@angular/core';
import { Friend } from '../frends-list/friend';
import { UserCurrentFriendshipStatus } from '../AirlineModel/userCurrentFriendshipStatus';
import { Router } from '@angular/router';
import { ReservationService } from '../Services/Reservation/reservation.service';
import { RegisteredUserService } from '../Services/RegisteredUser/registeredUser.service';
import { LoginService } from '../Services/Login/login.service';
import { User } from '../AirlineModel/user';
import { EmailService } from '../Services/Email/email.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  friends: Array<Friend>;
  friendsToInvite: Array<number>;
  people: number;
  isInvided: boolean;

  constructor(private router: Router,
    private reservationService: ReservationService,
    private registeredUserService: RegisteredUserService,
    private loginService: LoginService,
    private emailService: EmailService
    ) { }

  ngOnInit(): void {
    this.friends = [];
    this.friendsToInvite = [];
    this.isInvided = false;

    this.people = this.reservationService.searchData.people;
    //this.people = 3;
    let id = this.loginService.user.id;
    this.registeredUserService.getFriends(id).subscribe(res => {
      let frnds = res as Array<User>;
      for(let friend of frnds) {
        let frnd: Friend = new Friend(friend.firstName, friend.lastName, UserCurrentFriendshipStatus.Friend, friend.id);
        frnd.username = friend.username;
        this.friends.push(frnd);
      }
    })

    /*let f1 = new Friend("Nenad", "Kolasinac", UserCurrentFriendshipStatus.Friend, 4);
    f1.username = "aksdjfkasdn";
    this.friends.push(f1);   
    this.friends.push(new Friend("Nenad", "Kolasinac", UserCurrentFriendshipStatus.Friend, 3));
    this.friends.push(new Friend("Nenad", "Kolasinac", UserCurrentFriendshipStatus.Friend, 2));*/
  }

  friendCheckOrUncheck(event, friendId: number){
    if(event.target.checked == true) {
      if(this.friendsToInvite.length >= this.people - 1){
        event.srcElement.checked = false;
        alert("You can invite maximum " + (this.people - 1) + " people. If your friend doesn't have an account, you simply enter manually his information in passengers step (next step).");
        return;
      }

      this.friendsToInvite.push(friendId);
    }
    else {
      for (let i = 0; i < this.friendsToInvite.length; i++) {
        if(friendId == this.friendsToInvite[i]){
          this.friendsToInvite.splice(i, 1);
          break;
        }        
      }
    }
  }

  invite() {
    this.isInvided = true;
    alert("Sucessfully invited.");
    this.next();
  }

  next() {
    if(!this.isInvided && this.friendsToInvite.length != 0) {
      alert("You must invite selected people first.");
      return;
    }

    this.reservationService.setInvitedFriendsIds(this.friendsToInvite);
    this.router.navigate(['/passengers']);
  }

  cancel() {
    if(confirm("Are you sure you want to go cancel. All reservation data will be lost.")){
      this.reservationService.resetReservationData();
      this.router.navigate(['/airlines']);
    }
  }
}
