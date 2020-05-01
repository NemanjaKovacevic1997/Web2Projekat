import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarSelectedComponent } from './rent-a-car-selected.component';

describe('RentACarSelectedComponent', () => {
  let component: RentACarSelectedComponent;
  let fixture: ComponentFixture<RentACarSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
