import { Component, OnInit } from '@angular/core';
import { AirlinesComponent } from 'src/app/airlines/airlines.component';
import { SearchComponent } from 'src/app/search/search.component';

@Component({
  selector: 'airlinessearch',
  templateUrl: './airlines-search.component.html',
  styleUrls: ['./airlines-search.component.css']
})
export class AirlinesSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
