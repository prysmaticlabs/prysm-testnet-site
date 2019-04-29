import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class NoAccessWeb3Service extends Web3Service {
  constructor() { 
    super(new ethers.providers.JsonRpcProvider('https://goerli.prylabs.net'));
  }
}
