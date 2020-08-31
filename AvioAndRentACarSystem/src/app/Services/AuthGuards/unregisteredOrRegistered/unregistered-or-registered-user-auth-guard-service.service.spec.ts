import { TestBed } from '@angular/core/testing';

import { UnregisteredOrRegisteredUserAuthGuardServiceService } from './unregistered-or-registered-user-auth-guard-service.service';

describe('UnregisteredOrRegisteredUserAuthGuardServiceService', () => {
  let service: UnregisteredOrRegisteredUserAuthGuardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnregisteredOrRegisteredUserAuthGuardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
