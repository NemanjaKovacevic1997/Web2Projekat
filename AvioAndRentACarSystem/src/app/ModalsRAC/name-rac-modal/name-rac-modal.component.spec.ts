import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameRacModalComponent } from './name-rac-modal.component';

describe('NameRacModalComponent', () => {
  let component: NameRacModalComponent;
  let fixture: ComponentFixture<NameRacModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameRacModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameRacModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
