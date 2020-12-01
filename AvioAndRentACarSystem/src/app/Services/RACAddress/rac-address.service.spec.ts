import { TestBed } from '@angular/core/testing';

import { RacAddressService } from './rac-address.service';

describe('RacAddressService', () => {
  let service: RacAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
