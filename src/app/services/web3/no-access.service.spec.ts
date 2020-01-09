import { TestBed } from '@angular/core/testing';

import { NoAccessWeb3Service } from './no-access.service';

describe('NoAccessWeb3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoAccessWeb3Service = TestBed.get(NoAccessWeb3Service);
    expect(service).toBeTruthy();
  });
});
