import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsMapComponent } from './seats-map.component';

describe('SeatsMapComponent', () => {
  let component: SeatsMapComponent;
  let fixture: ComponentFixture<SeatsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
