import { TestBed } from '@angular/core/testing';

import { UnregisteredUserAuthGuardService } from './unregistered-user-auth-guard.service';

describe('UnregisteredUserAuthGuardService', () => {
  let service: UnregisteredUserAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnregisteredUserAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
