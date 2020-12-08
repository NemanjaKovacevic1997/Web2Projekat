import { TestBed } from '@angular/core/testing';

import { AdminSysUserService } from './admin-sys-user.service';

describe('AdminSysUserService', () => {
  let service: AdminSysUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSysUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
