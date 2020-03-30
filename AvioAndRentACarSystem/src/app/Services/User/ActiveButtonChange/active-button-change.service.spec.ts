import { TestBed } from '@angular/core/testing';

import { ActiveButtonChangeService } from './active-button-change.service';

describe('ActiveButtonChangeService', () => {
  let service: ActiveButtonChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveButtonChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
