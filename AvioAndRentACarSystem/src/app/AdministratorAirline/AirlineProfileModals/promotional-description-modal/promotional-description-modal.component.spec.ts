import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalDescriptionModalComponent } from './promotional-description-modal.component';

describe('PromotionalDescriptionModalComponent', () => {
  let component: PromotionalDescriptionModalComponent;
  let fixture: ComponentFixture<PromotionalDescriptionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalDescriptionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalDescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
