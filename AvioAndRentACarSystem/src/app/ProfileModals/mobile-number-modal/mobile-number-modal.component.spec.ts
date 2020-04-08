import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNumberModalComponent } from './mobile-number-modal.component';

describe('MobileNumberModalComponent', () => {
  let component: MobileNumberModalComponent;
  let fixture: ComponentFixture<MobileNumberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNumberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNumberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
