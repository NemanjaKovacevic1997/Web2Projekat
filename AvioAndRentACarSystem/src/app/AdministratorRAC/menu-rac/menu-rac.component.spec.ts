import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRacComponent } from './menu-rac.component';

describe('MenuRacComponent', () => {
  let component: MenuRacComponent;
  let fixture: ComponentFixture<MenuRacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
