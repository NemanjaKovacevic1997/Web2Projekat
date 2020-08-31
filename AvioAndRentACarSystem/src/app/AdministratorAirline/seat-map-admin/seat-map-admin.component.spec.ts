import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatMapAdminComponent } from './seat-map-admin.component';

describe('SeatMapAdminComponent', () => {
  let component: SeatMapAdminComponent;
  let fixture: ComponentFixture<SeatMapAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatMapAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatMapAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
