import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ethers } from 'ethers';
import { BeaconNodeService } from '../services/eth2/beacon-node.service';
import { CountdownService } from '../services/countdown/countdown.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  genesisTime: Date;

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
    let birthday = 1578812509;
    this.countdownService.getCountDown(birthday).subscribe(
      interval  => console.log('Countdown', interval),
      error => console.log('error', error),
      () => console.log('The countdown finish'),
    );

    this.beaconNodeService.getGenesisTime().subscribe(
      t => {
        console.log(t);
        this.genesisTime = t;
      },
      err => {
        console.error(err);
      }
    );
  }
}
