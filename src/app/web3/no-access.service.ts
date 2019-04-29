import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ethers } from 'ethers';

import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class NoAccessWeb3Service extends Web3Service {
  constructor(@Inject(PLATFORM_ID) platformId: Object) { 
    super(platformId, new ethers.providers.JsonRpcProvider('https://goerli.prylabs.net'));
  }
}
