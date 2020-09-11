import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressRacModalComponent } from './address-rac-modal.component';

describe('AddressRacModalComponent', () => {
  let component: AddressRacModalComponent;
  let fixture: ComponentFixture<AddressRacModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressRacModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressRacModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
