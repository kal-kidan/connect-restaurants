import { TestBed } from '@angular/core/testing';

import { AfterLoginForVendorService } from './after-login-for-vendor.service';

describe('AfterLoginForVendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfterLoginForVendorService = TestBed.get(AfterLoginForVendorService);
    expect(service).toBeTruthy();
  });
});
