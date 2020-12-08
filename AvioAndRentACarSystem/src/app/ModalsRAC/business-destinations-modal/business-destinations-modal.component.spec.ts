import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDestinationsModalComponent } from './business-destinations-modal.component';

describe('BusinessDestinationsModalComponent', () => {
  let component: BusinessDestinationsModalComponent;
  let fixture: ComponentFixture<BusinessDestinationsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDestinationsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDestinationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
