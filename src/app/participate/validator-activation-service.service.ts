import { Injectable } from '@angular/core';
import { zip, Observable, interval, of, Subject, from } from 'rxjs';
import { withLatestFrom, map, tap, switchMap, startWith, takeWhile, skipWhile, distinctUntilKeyChanged, distinct, distinctUntilChanged } from 'rxjs/operators';
import deepEqual from 'deep-equal';

import { environment } from '../../environments/environment';
import { ValidatorServiceClient } from '../../proto/ValidatorServiceClientPb';
import { ValidatorIndexRequest, ValidatorStatusResponse, ValidatorStatus } from '../../proto/validator_pb';
import { NoAccessWeb3Service } from '../web3/no-access.service';
import { ContractService } from '../web3/contract.service';

const SECONDS_PER_SLOT = 6;
const ETH1_FOLLOW_DISTANCE = 5;
const ETH1_BLOCK_TIME_SEC = 14;
const ACTIVATION_ELIGIBILITY_DELAY_SLOTS = 1 /*epoch*/ * 8 /*slotsPerEpoch*/;
const SLOTS_PER_ETH1_VOTING_PERIOD = 16 /*epochs*/ * 8 /*slotsPerEpoch*/;

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

  private readonly blockTimeCache = new Map<number, Date>();

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

    return zip(genesisTime$, this.statusFromServer(pubkey))
      .pipe(
        switchMap(([genesisTime, status]) => {

          const pollingInterval = SECONDS_PER_SLOT * 1000;
          const latestStatus$ = interval(pollingInterval).pipe(
            startWith(status),
            switchMap(() => this.statusFromServer(pubkey)),
          );

          const latestBlockTime$ = from(latestStatus$).pipe(
            map((s: ValidatorStatusResponse | null) => s && s.toObject()),
            distinctUntilChanged((a, b) => deepEqual(a, b)),
            skipWhile(s => s === null),
            tap(s => console.log(s)), // Debug logging update of new statuses.
            switchMap((s: ValidatorStatusResponse.AsObject) => this.blockTime(s)),
          );

          return interval(200).pipe(
            withLatestFrom(latestStatus$, latestBlockTime$),
            map(vals => this.estimateActivationStatus(genesisTime, vals[1], vals[2])),
          );
        }),
        skipWhile((s: ValidatorStatusUpdate)  => s.percent < 0),
        takeWhile((s: ValidatorStatusUpdate) => s.percent < 100, true),
        startWith({
          percent: 0,
          state: 'Waiting for deposit log to be observed by beacon nodes.',
        }),
        distinctUntilKeyChanged('percent'),
      );
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

  private blockTime(status: ValidatorStatusResponse.AsObject): Observable<Date> {
    if (status === null || status.Eth1DepositBlockNumber === 0) {
      return of(null);
    }
    return this.web3.blockTime(status.Eth1DepositBlockNumber);
  }

  private estimateActivationStatus(genesisTime: Date, status: ValidatorStatusResponse, eth1BlockTime?: Date): ValidatorStatusUpdate {
    if (status == null) {
      return {
        percent: -1,
        state: 'Unknown status.',
      };
    }


    const now = new Date();

    switch (status.getStatus()) {
      case ValidatorStatus.ACTIVE: {
        return {
          percent: 100,
          state: 'Validator is active.'
        };
      }
      case ValidatorStatus.PENDING_ACTIVE: {
        const inclusionTime = new Date(
          genesisTime.getTime() + status.getDepositInclusionSlot() * SECONDS_PER_SLOT * 1000
        );
        const secSinceInclusion = Math.max(0, (now.getTime() - inclusionTime.getTime()) / 1000);
        const estimatedDelaySlots =
          (ACTIVATION_ELIGIBILITY_DELAY_SLOTS *
          status.getPositionInActivationQueue()) +
          SLOTS_PER_ETH1_VOTING_PERIOD;
        const estimatedDelaySec = SECONDS_PER_SLOT * estimatedDelaySlots;

        const percent = 50 + Math.min(48, (secSinceInclusion / estimatedDelaySec) * 100);

        return {
          percent,
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
        if (status.getEth1DepositBlockNumber() === 0 || !eth1BlockTime) {
          return {
            percent: 3,
            state: 'Waiting for deposit log to be observed by beacon nodes.',
          };
        }

        const estimatedDelaySec = ETH1_FOLLOW_DISTANCE * ETH1_BLOCK_TIME_SEC + (ACTIVATION_ELIGIBILITY_DELAY_SLOTS * 6);

        const secSinceDeposit = Math.max(0, (now.getTime() - eth1BlockTime.getTime()) / 1000);
        const percent = Math.min(50, (secSinceDeposit / estimatedDelaySec) * 100);

        return {
          percent,
          state: 'Waiting for deposit to be included by validators.',
        };
      }
    }
  }
}
