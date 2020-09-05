import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRacComponent } from './report-rac.component';

describe('ReportRacComponent', () => {
  let component: ReportRacComponent;
  let fixture: ComponentFixture<ReportRacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
