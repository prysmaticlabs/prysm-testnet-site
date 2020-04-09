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
    'Casper Proof of Stake',
    'Goerli Testnet ETH for Staking',
    'Same Configuration Parameters as Mainnet'
  ];

  readonly notTestnetProperties = [
    'Includes Smart Contract & EVM Functionality',
    'Real ETH',
    'Sharding or Cross-Shard Transactions'
  ];

  readonly DEPOSIT_AMOUNT = ethers.utils.formatEther(environment.depositAmount);

  constructor(
  ) { }
}
