import { TestBed } from '@angular/core/testing';

import { PortisService } from './portis.service';

describe('PortisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortisService = TestBed.get(PortisService);
    expect(service).toBeTruthy();
  });
});
