import { TestBed } from '@angular/core/testing';

import { RegisteredUserService } from './registeredUser.service';

describe('UserService', () => {
  let service: RegisteredUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteredUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
