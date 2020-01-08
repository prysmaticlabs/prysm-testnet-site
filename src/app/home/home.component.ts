import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ethers } from 'ethers';
import { BeaconNodeService } from '../services/eth2/beacon-node.service';
import { CountdownService, IInterval } from '../services/countdown/countdown.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  genesisTime: Date;
  countingDown: boolean;
  countdown: IInterval;

  readonly testnetProperties = [
    'Prysm Only, Single Client Testnet',
    'Full, Casper Proof of Stake',
    'Goerli Testnet ETH for Staking',
    'Publicly Accessible',
  ];

  readonly notTestnetProperties = [
    'Multi-Client Network',
    'Includes Smart Contract & EVM Functionality',
    'Real ETH',
    'Highly Optimized',
  ];

  readonly DEPOSIT_AMOUNT = ethers.utils.formatEther(environment.depositAmount);

  constructor(
    private readonly beaconNodeService: BeaconNodeService,
    private readonly countdownService: CountdownService,
  ) { }

  ngOnInit() {
    this.beaconNodeService.getGenesisTime().subscribe(
      t => {
        console.log(t);
        this.genesisTime = t;
        this.countdownService.getCountDown(t.getTime()).subscribe(
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
}
