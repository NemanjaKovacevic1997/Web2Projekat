import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarReportComponent } from './rent-a-car-report.component';

describe('RentACarReportComponent', () => {
  let component: RentACarReportComponent;
  let fixture: ComponentFixture<RentACarReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
