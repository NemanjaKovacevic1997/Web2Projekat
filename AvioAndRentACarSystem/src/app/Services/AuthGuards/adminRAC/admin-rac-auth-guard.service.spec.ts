import { TestBed } from '@angular/core/testing';

import { AdminRacAuthGuardService } from './admin-rac-auth-guard.service';

describe('AdminRacAuthGuardService', () => {
  let service: AdminRacAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRacAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
