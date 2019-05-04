import { TestBed } from '@angular/core/testing';

import { ValidatorActivationServiceService } from './validator-activation-service.service';

describe('ValidatorActivationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidatorActivationServiceService = TestBed.get(ValidatorActivationServiceService);
    expect(service).toBeTruthy();
  });
});
