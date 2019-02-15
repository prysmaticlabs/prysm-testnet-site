import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class MetamaskService extends Web3Service {
  constructor() {
    try {
    super(new Web3((window as any).ethereum));
    } catch(e) {
      console.error(e);
    }
  }
}
