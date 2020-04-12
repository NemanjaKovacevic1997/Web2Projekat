import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNextComponent } from './back-next.component';

describe('BackNextComponent', () => {
  let component: BackNextComponent;
  let fixture: ComponentFixture<BackNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
