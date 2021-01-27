import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { RACService } from 'src/app/ModelRAC/racService';
import { RacServiceService } from 'src/app/Services/RACService/rac-service.service';

@Component({
  selector: 'app-page-rent-a-car',
  templateUrl: './page-rent-a-car.component.html',
  styleUrls: ['./page-rent-a-car.component.css']
})
export class PageRentACarComponent implements OnInit {

  racServices: Array<RACService>;

  constructor(private racServiceService: RacServiceService) { }

  ngOnInit(): void {
    this.racServiceService.getAll().subscribe(res => {this.racServices = res as Array<RACService>;})
  }

  fetchChange(change: boolean) {
    this.ngOnInit();
  }
}
