import { TestBed } from '@angular/core/testing';

import { AdminSysAuthGuardService } from './admin-sys-auth-guard.service';

describe('AdminSysAuthGuardService', () => {
  let service: AdminSysAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSysAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
