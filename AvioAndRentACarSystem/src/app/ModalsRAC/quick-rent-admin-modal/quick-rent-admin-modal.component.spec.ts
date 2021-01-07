import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRentAdminModalComponent } from './quick-rent-admin-modal.component';

describe('QuickRentAdminModalComponent', () => {
  let component: QuickRentAdminModalComponent;
  let fixture: ComponentFixture<QuickRentAdminModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRentAdminModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRentAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
