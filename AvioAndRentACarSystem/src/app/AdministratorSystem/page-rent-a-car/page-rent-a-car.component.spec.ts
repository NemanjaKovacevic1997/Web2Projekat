import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRentACarComponent } from './page-rent-a-car.component';

describe('PageRentACarComponent', () => {
  let component: PageRentACarComponent;
  let fixture: ComponentFixture<PageRentACarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRentACarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRentACarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
