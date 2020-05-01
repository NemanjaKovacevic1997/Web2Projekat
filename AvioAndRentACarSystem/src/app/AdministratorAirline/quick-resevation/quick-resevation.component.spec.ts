import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickResevationComponent } from './quick-resevation.component';

describe('QuickResevationComponent', () => {
  let component: QuickResevationComponent;
  let fixture: ComponentFixture<QuickResevationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickResevationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickResevationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
