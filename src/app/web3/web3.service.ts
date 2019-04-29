import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ethers } from 'ethers';
import { Observable, Subject } from 'rxjs';

import { ContractService } from './contract.service';
import { DEPOSIT_CONTRACT_ABI } from './DepositContract';
import { environment } from '../../environments/environment';

const TESTNET_ID = 5;
const TESTNET_URL = 'https://goerli.prylabs.net';
export const DEPOSIT_AMOUNT = environment.depositAmount;

export enum Web3Provider {
  PORTIS,
  METAMASK,
}


export abstract class Web3Service {
  private signer: ethers.providers.JsonRpcSigner;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public readonly eth: ethers.providers.JsonRpcProvider,
  ) {
    // Do not use a real eth provider in server side rendering.
    if (isPlatformServer(platformId)) {
      this.eth = undefined;
    } 
  }

  /** Throws an error if the provider is on the wrong network. */
  ensureTestnet(): Promise<void> {
    if (isPlatformServer(this.platformId)) {
      return Promise.resolve();
    }

    return this.eth.getNetwork().then(net => {
      if (net.chainId !== TESTNET_ID) {
        throw new Error(`Invalid testnet id: ${net.chainId}. Restart your web3 provider connected to ${TESTNET_URL} or other Goerli network node.`);
      }
    });
  }

  /** Throws an error if there is no signer. */
  ensureSigner(): Promise<void> {
   if (isPlatformServer(this.platformId)) {
      return Promise.resolve();
    }

   return this.eth.listAccounts().then(accounts => {
     if (accounts.length === 0) {
       throw new Error("no accounts to sign with");
     }
     this.signer = this.eth.getSigner(accounts[0]);
   });
  }

  /** Returns list of accounts associated with the web3 provider */
  queryAccounts(): Promise<string[]> {
    if (isPlatformServer(this.platformId)) {
        return Promise.resolve([]);
    }

    return this.eth.listAccounts();
  }

  /** Returns the balance of an account in units of ETH */
  ethBalanceOf(address: string): Promise<string> {
    if (isPlatformServer(this.platformId)) {
      return Promise.resolve("0");
    }

    return this.eth.getBalance(address)
      .then(bal => ethers.utils.formatEther(bal));
  }

  /** Reference to the deposit contract */
  depositContract(address: string) {
    return new ethers.Contract(address, DEPOSIT_CONTRACT_ABI, this.signer || this.eth);
  }

  /** Number of validators that have deposited so far */
  numValidators(address: string): Promise<number> {
    if (isPlatformServer(this.platformId)) {
      return Promise.resolve(16640);
    }

    return this.depositContract(address)
      .functions
      .deposit_count()
      .then((res: ethers.utils.BigNumber) => res.toNumber());
  }

  /** Max value required to deposit */ 
  maxDepositValue(address: string): Promise<number> {
    if (isPlatformServer(this.platformId)) {
        return Promise.resolve(ethers.utils.parseEther("32").toNumber());
    }

    return this.depositContract(address)
      .methods
      .MAX_DEPOSIT_AMOUNT() // Note: this is denoted in gwei!
      .call() 
      .then(res => ethers.utils.parseUnits(res[0], 'gwei'));
  }

  /** Deposit event stream */ 
  depositEvents(address: string): Observable<void> {
    if (isPlatformServer(this.platformId)) {
      return new Observable();
    }

    return new Observable(observer => {
      const filter = this.depositContract(address).filters.Deposit();
      this.depositContract(address).on(filter, () => observer.next());
    });
  }
}
