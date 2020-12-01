import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarRentsComponent } from './rent-a-car-rents.component';

describe('RentACarRentsComponent', () => {
  let component: RentACarRentsComponent;
  let fixture: ComponentFixture<RentACarRentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarRentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
