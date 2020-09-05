import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRacComponent } from './filter-rac.component';

describe('FilterRacComponent', () => {
  let component: FilterRacComponent;
  let fixture: ComponentFixture<FilterRacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterRacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
