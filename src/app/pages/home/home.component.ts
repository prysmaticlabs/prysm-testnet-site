import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ethers } from 'ethers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
  ) { }
}
