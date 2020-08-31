import { TestBed } from '@angular/core/testing';

import { NotUnregisteredUserAuthGuardService } from './not-unregistered-user-auth-guard.service';

describe('NotUnregisteredUserAuthGuardService', () => {
  let service: NotUnregisteredUserAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotUnregisteredUserAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
