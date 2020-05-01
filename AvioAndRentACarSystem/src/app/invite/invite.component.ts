import { Component, OnInit } from '@angular/core';
import { Friend } from '../frends-list/friend';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  f1 : Friend = new Friend('Marko', 'Sutic', true, false);
  f2 : Friend = new Friend('Rasa', 'Trudic', false, false);
  f3 : Friend = new Friend('Radisa', 'Trajkovic', false, true);
  f4 : Friend = new Friend('Mitar', 'Miric', true, true);

  friends = [this.f1, this.f2, this.f3, this.f4];
  
  constructor() { }

  ngOnInit(): void {
  }

}
