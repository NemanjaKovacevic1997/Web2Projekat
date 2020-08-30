import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'back-next',
  templateUrl: './back-next.component.html',
  styleUrls: ['./back-next.component.css']
})
export class BackNextComponent implements OnInit {
  @Input('backRouting') backRouting: string;
  @Input('nextRouting') nextRouting: string;

  constructor() { }

  ngOnInit(): void {
  }


}
