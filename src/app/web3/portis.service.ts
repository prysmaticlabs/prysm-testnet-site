import { Injectable } from '@angular/core';
import Portis from '@portis/web3';
import Web3 from 'web3';
import { Web3Service } from './web3.service';

const DAPP_ID = 'cf87be83-629d-4e45-a0e6-4341e050f770';
const NETWORK = 'goerli';
const portis = new Portis(DAPP_ID, NETWORK);

@Injectable({
  providedIn: 'root',
})
export class PortisService extends Web3Service {
  constructor() {
    super(new Web3(portis.provider));
  } 
}
