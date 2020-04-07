import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrendsListComponent } from './frends-list.component';

describe('FrendsListComponent', () => {
  let component: FrendsListComponent;
  let fixture: ComponentFixture<FrendsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrendsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
