import { TestBed } from '@angular/core/testing';

import { AdminAirlinesUserService } from './admin-airlines-user.service';

describe('AdminAirlinesUserService', () => {
  let service: AdminAirlinesUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAirlinesUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
