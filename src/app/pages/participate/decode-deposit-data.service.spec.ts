import { TestBed } from '@angular/core/testing';

import { DecodeDepositDataService } from './decode-deposit-data.service';

describe('DecodeDepositDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecodeDepositDataService = TestBed.get(DecodeDepositDataService);
    expect(service).toBeTruthy();
  });
});
