import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNameModalComponent } from './last-name-modal.component';

describe('LastNameModalComponent', () => {
  let component: LastNameModalComponent;
  let fixture: ComponentFixture<LastNameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastNameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
