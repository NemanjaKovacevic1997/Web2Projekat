import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarRacComponent } from './add-car-rac.component';

describe('AddCarRacComponent', () => {
  let component: AddCarRacComponent;
  let fixture: ComponentFixture<AddCarRacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarRacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
