import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRacComponent } from './info-rac.component';

describe('InfoRacComponent', () => {
  let component: InfoRacComponent;
  let fixture: ComponentFixture<InfoRacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
