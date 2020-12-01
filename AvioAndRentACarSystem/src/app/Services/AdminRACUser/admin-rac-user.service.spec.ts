import { TestBed } from '@angular/core/testing';

import { AdminRacUserService } from './admin-rac-user.service';

describe('AdminRacUserService', () => {
  let service: AdminRacUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRacUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
