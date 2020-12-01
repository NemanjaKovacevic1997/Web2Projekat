import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorRacModalComponent } from './administrator-rac-modal.component';

describe('AdministratorRacModalComponent', () => {
  let component: AdministratorRacModalComponent;
  let fixture: ComponentFixture<AdministratorRacModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorRacModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorRacModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
