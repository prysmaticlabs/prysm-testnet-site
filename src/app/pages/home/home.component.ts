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
    'Full, Casper Proof of Stake',
    'Goerli Testnet ETH for Staking',
  ];

  readonly notTestnetProperties = [
    'Includes Smart Contract & EVM Functionality',
    'Real ETH',
  ];

  readonly DEPOSIT_AMOUNT = ethers.utils.formatEther(environment.depositAmount);

  constructor(
  ) { }
}
