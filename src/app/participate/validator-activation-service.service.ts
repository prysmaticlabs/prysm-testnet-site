import { Injectable } from '@angular/core';
import { zip, Observable, interval, of, Subject, from } from 'rxjs';
import { retry, withLatestFrom, map, tap, switchMap, startWith, takeWhile, skipWhile, distinctUntilKeyChanged, distinct, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Buffer} from 'buffer';
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

  constructor(
    private readonly web3: NoAccessWeb3Service,
    private readonly contractService: ContractService,
    private readonly http: HttpClient,
  ) { }

  genesisTime(): Observable<Date> {
    return this.http.get('https://api.prylabs.network/eth/v1alpha1/node/genesis').pipe(
      map((res: {genesisTime: string}) => new Date(Date.parse(res.genesisTime)))
    );
  }

  // Updates the validator status percent every 200ms until 100%.
  validatorStatus(pubkey: string): Observable<ValidatorStatusUpdate> {
    const genesisTime$ = this.genesisTime();

    return zip(genesisTime$, this.statusFromServer(pubkey))
      .pipe(
        switchMap(([genesisTime, status]) => {
          console.log("here");

          const pollingInterval = SECONDS_PER_SLOT * 1000;
          const latestStatus$ = interval(pollingInterval).pipe(
            startWith(status),
            switchMap(() => this.statusFromServer(pubkey)),
          );

          const latestBlockTime$ = from(latestStatus$).pipe(
            distinctUntilChanged((a, b) => deepEqual(a.toObject(), b.toObject())),
            tap(s => console.log(s)), // Debug logging update of new statuses.
            switchMap((s: ValidatorStatusResponse) => this.blockTime(s)),
          );

          return interval(200).pipe(
            withLatestFrom(latestStatus$, latestBlockTime$),
            map(vals => this.estimateActivationStatus(genesisTime, vals[1], vals[2])),
          );
        }),
        // skipWhile((s: ValidatorStatusUpdate)  => s.percent < 0),
        takeWhile((s: ValidatorStatusUpdate) => s.percent < 100, true),
        startWith({
          percent: 0,
          state: 'Waiting for deposit log to be observed by beacon nodes.',
        }),
        distinctUntilKeyChanged('percent'),
      );
  }

  private statusFromServer(pubkey: string): Observable<ValidatorStatusResponse> {
    console.log("Requesting status from server");
    if (pubkey.startsWith('0x')) {
       pubkey = Buffer.from(pubkey.slice(2), 'hex').toString('base64')
    }
    return new Observable<ValidatorStatusResponse>((observer) => {
      const req: ValidatorIndexRequest = new ValidatorIndexRequest();
      req.setPublicKey(pubkey);

      this.client.validatorStatus(req, null/*metadata*/, (err, resp) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(resp);
        }
      });
    }).pipe(retry());
  }

  private blockTime(status: ValidatorStatusResponse): Observable<Date> {
    if (status === null || status.getEth1DepositBlockNumber() === 0) {
      return of(null);
    }
    return this.web3.blockTime(status.getEth1DepositBlockNumber());
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

        // Add 120s arbitrary delay in block inclusion...
        const estimatedDelaySec = ETH1_FOLLOW_DISTANCE * ETH1_BLOCK_TIME_SEC + (ACTIVATION_ELIGIBILITY_DELAY_SLOTS * 6) + 120;

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
