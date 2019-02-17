import { Injectable } from '@angular/core';
import Web3 from 'web3';

import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class NoAccessWeb3Service extends Web3Service {
  constructor() { 
    super(new Web3('https://goerli.prylabs.net'));
  }
}
