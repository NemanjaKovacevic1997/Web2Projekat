import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCarModalComponent } from './change-car-modal.component';

describe('ChangeCarModalComponent', () => {
  let component: ChangeCarModalComponent;
  let fixture: ComponentFixture<ChangeCarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
