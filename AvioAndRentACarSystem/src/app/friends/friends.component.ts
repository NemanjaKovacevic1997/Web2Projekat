import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  all: boolean;
  friendsOnly: boolean;
  friendshipEventsOnly: boolean;
  searchInput: string;

  constructor() { }

  ngOnInit(): void {
    this.all = true;
    this.friendsOnly = false;
    this.friendshipEventsOnly = false;
  }

  allClick() {
    this.all = true;
    this.friendsOnly = false;
    this.friendshipEventsOnly = false;
  }

  friendsOnlyClick() {
    this.all = false;
    this.friendsOnly = true;
    this.friendshipEventsOnly = false;
  }

  friendshipEventsOnlyClick() {
    this.all = false;
    this.friendsOnly = false;
    this.friendshipEventsOnly = true;
  }

  searchInputChange(value: string) {
    this.searchInput = value;
  }
}
