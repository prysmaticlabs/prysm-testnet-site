import Web3 from 'web3';
import {DEPOSIT_CONTRACT_ABI} from './DepositContract';

const TESTNET_ID = 5;
const TESTNET_URL = 'https://goerli.prylabs.net';
export const DEPOSIT_CONTRACT_ADDRESS = '0x9cbd127973072989d5c69001a6527DF501Dd3c93';

export enum Web3Provider {
  PORTIS,
  METAMASK,
}

export abstract class Web3Service {
  constructor(protected readonly web3: Web3) {}

  /** Throws an error if the provider is on the wrong network. */
  ensureTestnet(): Promise<void> {
    return this.web3.eth.net.getId().then(id => {
      if (id !== TESTNET_ID) {
        throw new Error(`Invalid testnet id: ${id}. Restart your web3 provider connected to ${TESTNET_URL} or other Goerli network node.`); 
      }
    });
  }

  /** Returns list of accounts associated with the web3 provider */
  queryAccounts(): Promise<string[]> {
    return this.web3.eth.getAccounts();
  }

  /** Returns the balance of an account in units of ETH */
  ethBalanceOf(address: string): Promise<string> {
    return this.web3.eth.getBalance(address)
      .then(bal => this.web3.utils.fromWei(bal, 'ether'));
  }

  /** Reference to the deposit contract */
  get depositContract() {
    return new this.web3.eth.Contract(DEPOSIT_CONTRACT_ABI as any, DEPOSIT_CONTRACT_ADDRESS);
  }

  /** Number of validators taht have deposited so far */
  numValidators(): Promise<number> {
    return this.depositContract
      .methods
      .deposit_count()
      .call()
      .then(res => res[0]);
  }

  depositEvents() {
    return this.depositContract
       .events.Deposit();
  }
}
