import { TestBed } from '@angular/core/testing';

import { VistorService } from './vistor.service';

describe('VistorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VistorService = TestBed.get(VistorService);
    expect(service).toBeTruthy();
  });
});
