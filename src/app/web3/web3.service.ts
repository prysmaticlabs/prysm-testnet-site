import { ethers } from 'ethers';

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
  constructor(public readonly eth: ethers.providers.JsonRpcProvider) {}

  /** Throws an error if the provider is on the wrong network. */
  ensureTestnet(): Promise<void> {
    return this.eth.getNetwork().then(net => {
      if (net.chainId !== TESTNET_ID) {
        throw new Error(`Invalid testnet id: ${net.chainId}. Restart your web3 provider connected to ${TESTNET_URL} or other Goerli network node.`);
      }
    });
  }

  /** Returns list of accounts associated with the web3 provider */
  queryAccounts(): Promise<string[]> {
    return this.eth.listAccounts();
  }

  /** Returns the balance of an account in units of ETH */
  ethBalanceOf(address: string): Promise<string> {
    return this.eth.getBalance(address)
      .then(bal => ethers.utils.formatEther(bal));
  }

  /** Reference to the deposit contract */
  depositContract(address: string) {
    return new ethers.Contract(address, DEPOSIT_CONTRACT_ABI, this.eth);
  }

  /** Number of validators that have deposited so far */
  numValidators(address: string): Promise<number> {
    return this.depositContract(address)
      .methods
      .deposit_count()
      .call()
      .then(res => res[0]);
  }

  /** Max value required to deposit */ 
  maxDepositValue(address: string): Promise<number> {
    return this.depositContract(address)
      .methods
      .MAX_DEPOSIT_AMOUNT() // Note: this is denoted in gwei!
      .call() 
      .then(res => ethers.utils.parseUnits(res[0], 'gwei'));
  }

  /** Deposit event stream */ 
  depositEvents(address: string) {
    return this.depositContract(address)
       .events.Deposit();
  }
}
