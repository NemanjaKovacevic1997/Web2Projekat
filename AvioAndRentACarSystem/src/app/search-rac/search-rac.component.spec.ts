import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRacComponent } from './search-rac.component';

describe('SearchRacComponent', () => {
  let component: SearchRacComponent;
  let fixture: ComponentFixture<SearchRacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
