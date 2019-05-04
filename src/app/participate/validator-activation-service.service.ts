import { Injectable } from '@angular/core';
import { Observable, interval, of, combineLatest, Subject, timer, concat } from 'rxjs';
import { map, switchMap, startWith, takeWhile, skipWhile } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ValidatorServiceClient } from '../../proto/ValidatorServiceClientPb';
import { ValidatorIndexRequest, ValidatorStatusResponse, ValidatorStatus } from '../../proto/validator_pb';
import { NoAccessWeb3Service } from '../web3/no-access.service';
import { ContractService } from '../web3/contract.service';

const SECONDS_PER_SLOT = 6;

export interface ValidatorStatusUpdate {
  percent: number;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorActivationServiceService {
  private readonly client = new ValidatorServiceClient(
    // 'http://localhost:8080',
    environment.apiEndpoint,
    null /* credentials */,
    null /* options */);

  constructor(
    private readonly web3: NoAccessWeb3Service,
    private readonly contractService: ContractService,
  ) { }


  // Updates the validator status percent every 200ms until 100%.
  validatorStatus(pubkey: string): Observable<ValidatorStatusUpdate> {
    // TODO: First fetch the validator status for the pubkey.
    // Then continuously map it out, then take until its estimated to be 100%.

    const genesisTime$ = this.contractService.getAddress()
      .pipe(switchMap(address => this.web3.genesisTime(address)));

    return combineLatest(genesisTime$, this.statusFromServer(pubkey))
      .pipe(
        switchMap(([genesisTime, status]) => {

          const pollingInterval = SECONDS_PER_SLOT * 1000;
          const latestStatus$ = interval(pollingInterval).pipe(
            startWith(status),
            switchMap(() => this.statusFromServer(pubkey)),
          );

          return concat(
            of(this.estimateActivationStatus(genesisTime, status)),
            combineLatest(interval(500), latestStatus$)
              .pipe(
                map(v => v[1]),
                map(s => this.estimateActivationStatus(genesisTime, s)),
                takeWhile(s => s.percent < 100, true),
              )
          );
        }),
        skipWhile(s => s.percent < 0),
        startWith({
          percent: 0,
          state: 'Waiting for deposit to be seen by beacon nodes.',
        }));
  }

  private statusFromServer(pubkey: string): Observable<ValidatorStatusResponse> {
    const subject = new Subject<ValidatorStatusResponse>();
    const req: ValidatorIndexRequest = new ValidatorIndexRequest();
    req.setPublicKey(pubkey);

    this.client.validatorStatus(req, null/*metadata*/, (err, resp) => {
      if (err) {
        console.error(err);
      }

      subject.next(resp);
    });
    return subject;
  }

  private estimateActivationStatus(genesisTime: Date, status: ValidatorStatusResponse): ValidatorStatusUpdate {
    if (status == null) {
      return {
        percent: -1,
        state: 'Unknown status.',
      };
    }

    switch (status.getStatus()) {
      case ValidatorStatus.ACTIVE: {
        return {
          percent: 100,
          state: 'Validator is active.'
        };
      }
      case ValidatorStatus.PENDING_ACTIVE: {
        return {
          percent: 50,
          state: 'Validator is pending activation.',
        };
      }
      case ValidatorStatus.EXITED: {
        return {
          percent: 100,
          state: 'Validator has been exited from the active set.'
        };
      }
      case ValidatorStatus.UNKNOWN_STATUS:
      default: {
        let percent = 0;
        if (status.getEth1DepositBlockNumber() > 0) {
          percent += 10;
        }

        return {
          percent,
          state: 'Waiting for deposit to be included by validators.',
        };
      }
    }
  }
}
