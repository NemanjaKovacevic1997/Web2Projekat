import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAirlinesComponent } from './page-airlines.component';

describe('PageAirlinesComponent', () => {
  let component: PageAirlinesComponent;
  let fixture: ComponentFixture<PageAirlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAirlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAirlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
