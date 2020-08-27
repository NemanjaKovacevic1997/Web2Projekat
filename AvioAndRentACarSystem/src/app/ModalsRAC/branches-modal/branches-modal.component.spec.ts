import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesModalComponent } from './branches-modal.component';

describe('BranchesModalComponent', () => {
  let component: BranchesModalComponent;
  let fixture: ComponentFixture<BranchesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
