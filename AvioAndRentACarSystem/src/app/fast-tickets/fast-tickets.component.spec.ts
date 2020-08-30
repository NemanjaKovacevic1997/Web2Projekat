import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastTicketsComponent } from './fast-tickets.component';

describe('FastTicketsComponent', () => {
  let component: FastTicketsComponent;
  let fixture: ComponentFixture<FastTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
