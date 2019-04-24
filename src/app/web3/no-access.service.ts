import { Injectable } from '@angular/core';
import Web3 from 'web3';

import { Web3Service } from './web3.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoAccessWeb3Service extends Web3Service {
  constructor(http: HttpClient) { 
    super(new Web3('wss://goerli.prylabs.net/websocket'), http);
  }
}
