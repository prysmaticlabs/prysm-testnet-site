import { TestBed } from '@angular/core/testing';

import { BeaconNodeService } from './beacon-node.service';

describe('BeaconNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeaconNodeService = TestBed.get(BeaconNodeService);
    expect(service).toBeTruthy();
  });
});
