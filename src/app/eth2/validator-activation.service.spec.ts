import { TestBed } from '@angular/core/testing';

import { ValidatorActivationService } from './validator-activation.service';

describe('ValidatorActivationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidatorActivationService = TestBed.get(ValidatorActivationService );
    expect(service).toBeTruthy();
  });
});
