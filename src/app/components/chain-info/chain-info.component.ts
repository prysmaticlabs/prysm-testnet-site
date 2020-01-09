import { Component, OnInit } from '@angular/core';

import { BeaconNodeService } from '../../services/eth2/beacon-node.service';
import { CountdownService, IInterval } from '../../services/countdown/countdown.service';
import { ContractService } from '../../services/web3/contract.service';
import { NoAccessWeb3Service } from '../../services/web3/no-access.service';
import { ProgressService } from '../../services/progress/progress.service';

@Component({
  selector: 'app-chain-info',
  templateUrl: './chain-info.component.html',
  styleUrls: ['./chain-info.component.scss']
})
export class ChainInfoComponent implements OnInit {
  genesisTime: Date;
  countingDown: boolean;
  countdown: IInterval;
  depositContractAddress: string;
  totalValidators: number;
  numActiveValidators: number = 0;
  private globalProgress = false;

  constructor(
    private readonly beaconNodeService: BeaconNodeService,
    private readonly countdownService: CountdownService,
    private readonly contractService: ContractService,
    private readonly web3: NoAccessWeb3Service,
    private readonly progress: ProgressService,
  ) {
    this.progress.progress.subscribe(v => this.globalProgress = v);
  }

  ngOnInit() {
    this.progress.startProgress();
    this.contractService.getAddress().subscribe(async (res: string) => {
      this.depositContractAddress = res;
      await this.updateValidatorCount(res);
    });

    this.beaconNodeService.getNumActiveValidators().subscribe(
      num => {
        this.numActiveValidators = num;
      },
      err => {
        console.error(err);
      }
    );

    this.beaconNodeService.getGenesisTime().subscribe(
      t => {
        this.genesisTime = t;
        const unixTimestamp = t.getTime();
        this.countdownService.getCountDown(unixTimestamp).subscribe(
          latestCountdownValue  => {
            this.countdown = latestCountdownValue;
            this.countingDown = true;
          },
          error => console.error(error),
          () => {
            this.countingDown = false;
          }
        );
      },
      err => {
        console.error(err);
      }
    );
  }

  get inProgress(): boolean {
    return !this.globalProgress || this.numActiveValidators <= 0;
  }

  private async updateValidatorCount(address: string) {
    this.totalValidators = await this.web3.numValidators(address);
    this.progress.stopProgress();
  }
}
