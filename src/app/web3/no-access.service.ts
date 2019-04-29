import { Injectable } from '@angular/core';
import { Eth } from 'web3-eth';

import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class NoAccessWeb3Service extends Web3Service {
  constructor() { 
    super(new Eth('wss://goerli.prylabs.net/websocket'));
  }
}
