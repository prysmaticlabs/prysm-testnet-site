import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import Portis from '@portis/web3';
import { ethers } from 'ethers';
import { Web3Service } from './web3.service';

const DAPP_ID = 'cf87be83-629d-4e45-a0e6-4341e050f770';
const NETWORK = 'goerli';

@Injectable({
  providedIn: 'root',
})
export class PortisService extends Web3Service {
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    const provider = isPlatformServer(platformId) ? undefined : new Portis(DAPP_ID, NETWORK).provider;
    super(platformId, new ethers.providers.Web3Provider(provider));
  } 
}
