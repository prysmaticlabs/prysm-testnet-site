import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { PortisService } from '../web3/portis.service';
import { MetamaskService } from '../web3/metamask.service';
import { ProgressService } from '../progress.service';
import { DEPOSIT_CONTRACT_ADDRESS, Web3Service, Web3Provider } from '../web3/web3.service';

const DEPOSIT_DATA_STORAGE_KEY = 'deposit_data';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss']
})
export class ParticipateComponent implements OnInit {
  private web3?: Web3Service;
  web3Provider = Web3Provider;
  walletAddress: string;
  balance: string;
  depositData: string;
  readonly CONTRACT_ADDRESS = DEPOSIT_CONTRACT_ADDRESS;
  readonly DOCKER_TAG = "latest";

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private readonly portis: PortisService,
    private readonly metamask: MetamaskService, 
    private readonly snackbar: MatSnackBar,
    private readonly storage: LocalStorage,
    private readonly progress: ProgressService,
  ) { }

  ngOnInit() {
    this.storage.getItem(DEPOSIT_DATA_STORAGE_KEY).subscribe((data: string) => {
      this.depositData = data;
    });
  }

  updateDepositData(data: string) {
    // setItem must be subscribed with a no-op or it won't fire the observable.
    this.storage.setItem(DEPOSIT_DATA_STORAGE_KEY, data).subscribe(() => {});
  }
  
  private showError(err: Error) {
    this.snackbar.openFromComponent(SimpleSnackBar, {
      data: { message: err, action: 'OK' },
    }); 
    this.progress.stopProgress();
  }

  async chooseWeb3Provider(provider: Web3Provider) {
    switch(provider) {
      case Web3Provider.METAMASK: this.web3 = this.metamask; break;
      case Web3Provider.PORTIS: this.web3 = this.portis; break;
      default: throw new Error("Unknown provider: " + provider); 
    }

    try {
      await this.web3.ensureTestnet();
    } catch (e) {
      return this.showError(e);
    }
   
    const accounts = await this.web3.queryAccounts();
    this.walletAddress = accounts[0];
    this.balance = await this.web3.ethBalanceOf(this.walletAddress);
  }

  async makeDeposit() {
    const snackbarConfig = {
        duration: 10000, //ms
      };
    try {
      if (!this.web3) {
        throw new Error('choose a web3 provider to make a deposit');
      }
      this.progress.startProgress();
      this.web3.depositContract.methods.deposit(this.depositData).send({
        value: await this.web3.maxDepositValue(), 
        from: this.walletAddress,
        gasLimit: 400000,
      }).on('transactionHash', () => {
        this.snackbar.open('Transaction received. Pending confirmation...', '', snackbarConfig);
      }).on('receipt', () => {
        this.snackbar.open('Transaction confirmed. You are deposited!', 'OK', snackbarConfig);
        this.progress.stopProgress();
      }).on('error', this.showError);
    } catch (e) {
      this.showError(e);
    }
  }
}
