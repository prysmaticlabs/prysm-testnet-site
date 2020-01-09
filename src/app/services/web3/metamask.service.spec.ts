import { TestBed } from '@angular/core/testing';

import { MetamaskService } from './metamask.service';

describe('MetamaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetamaskService = TestBed.get(MetamaskService);
    expect(service).toBeTruthy();
  });
});
