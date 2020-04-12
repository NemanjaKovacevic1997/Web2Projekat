import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFlightsComponent } from './airline-flights.component';

describe('AirlineFlightsComponent', () => {
  let component: AirlineFlightsComponent;
  let fixture: ComponentFixture<AirlineFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
