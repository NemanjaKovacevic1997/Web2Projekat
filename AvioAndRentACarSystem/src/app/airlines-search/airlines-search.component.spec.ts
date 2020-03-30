import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesSearchComponent } from './airlines-search.component';

describe('AirlinesSearchComponent', () => {
  let component: AirlinesSearchComponent;
  let fixture: ComponentFixture<AirlinesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlinesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
