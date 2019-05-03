import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ValidatorServiceClient } from '../../proto/ValidatorServiceClientPb';

interface ValidatorStatusUpdate {
  percent: number;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorActivationServiceService {
  private readonly client = new ValidatorServiceClient(
    environment.apiEndpoint,
    null /* credentials */,
    null /* options */);


  // Updates the validator status percent every 200ms until 100%.
  validatorStatus(pubkey: string): Observable<ValidatorStatusUpdate> {
    // TODO: First fetch the validator status for the pubkey.
    // Then continuously map it out, then take until its estimated to be 100%.
    return interval(200).pipe(
      map(() => { return {} as any as ValidatorStatusUpdate; }),
    );
  }
}
