import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsAdminComponent } from './flights-admin.component';

describe('FlightsAdminComponent', () => {
  let component: FlightsAdminComponent;
  let fixture: ComponentFixture<FlightsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
