import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsModifyAdminComponent } from './seats-modify-admin.component';

describe('SeatsModifyAdminComponent', () => {
  let component: SeatsModifyAdminComponent;
  let fixture: ComponentFixture<SeatsModifyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsModifyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsModifyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
