import { TestBed } from '@angular/core/testing';

import { AfterLoginForAdminService } from './after-login-for-admin.service';

describe('AfterLoginForAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfterLoginForAdminService = TestBed.get(AfterLoginForAdminService);
    expect(service).toBeTruthy();
  });
});
