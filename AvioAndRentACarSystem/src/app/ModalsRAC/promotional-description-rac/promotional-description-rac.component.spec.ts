import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalDescriptionRacComponent } from './promotional-description-rac.component';

describe('PromotionalDescriptionRacComponent', () => {
  let component: PromotionalDescriptionRacComponent;
  let fixture: ComponentFixture<PromotionalDescriptionRacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalDescriptionRacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalDescriptionRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
