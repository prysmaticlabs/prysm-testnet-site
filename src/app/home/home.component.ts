import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly testnetProperties = [
    'Prysm Only, Single Client Testnet',
    'Full, Casper Proof of Stake',
    'Goerli Testnet ETH for Staking',
    'Publicly Accessible',
    'Short-Lived (24 hrs at a time)',
  ];

  readonly notTestnetProperties = [
    'Multi-Client Network',
    'Includes Smart Contract & EVM Functionality',
    'Real ETH',
    'Highly Optimized',
    'Long Running & Highly Available',
  ];

  constructor() { }

  ngOnInit() {
  }

}
