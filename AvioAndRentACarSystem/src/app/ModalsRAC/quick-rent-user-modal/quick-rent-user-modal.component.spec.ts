import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRentUserModalComponent } from './quick-rent-user-modal.component';

describe('QuickRentUserModalComponent', () => {
  let component: QuickRentUserModalComponent;
  let fixture: ComponentFixture<QuickRentUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRentUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRentUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
