import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstNameModalComponent } from './first-name-modal.component';

describe('FirstNameModalComponent', () => {
  let component: FirstNameModalComponent;
  let fixture: ComponentFixture<FirstNameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstNameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
