import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdministratorsComponent } from './page-administrators.component';

describe('PageAdministratorsComponent', () => {
  let component: PageAdministratorsComponent;
  let fixture: ComponentFixture<PageAdministratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdministratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
