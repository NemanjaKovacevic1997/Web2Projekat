import { TestBed } from '@angular/core/testing';

import { RacServiceService } from './rac-service.service';

describe('RacServiceService', () => {
  let service: RacServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
