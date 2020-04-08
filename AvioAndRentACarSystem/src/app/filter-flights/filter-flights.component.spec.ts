import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFlightsComponent } from './filter-flights.component';

describe('FilterFlightsComponent', () => {
  let component: FilterFlightsComponent;
  let fixture: ComponentFixture<FilterFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
