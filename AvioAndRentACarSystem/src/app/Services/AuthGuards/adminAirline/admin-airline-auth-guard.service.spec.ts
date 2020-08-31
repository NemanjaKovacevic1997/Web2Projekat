import { TestBed } from '@angular/core/testing';

import { AdminAirlineAuthGuardService } from './admin-airline-auth-guard.service';

describe('AdminAirlineAuthGuardService', () => {
  let service: AdminAirlineAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAirlineAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
