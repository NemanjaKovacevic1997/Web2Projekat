import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilghtDetailsComponent } from './filght-details.component';

describe('FilghtDetailsComponent', () => {
  let component: FilghtDetailsComponent;
  let fixture: ComponentFixture<FilghtDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilghtDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilghtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
