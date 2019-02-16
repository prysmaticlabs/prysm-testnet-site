import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { PortisService } from '../web3/portis.service';
import { MetamaskService } from '../web3/metamask.service';
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
    const contract = this.web3.depositContract;
    const data = "0x5700000040000000956df606414c1db3873b295ff51ed926708116919ca133c4d3502a59aa54e034c482162039307fbdfd7b8e32cef3ecd65cb062ee2c82cc7b117b1d3487bea65303000000706f70080000007769746864726177";
    try {
      const res = await contract.methods.deposit(data).send({
        value: 3200000000000, // TODO Get this from the public max deposit.
        from: this.walletAddress,
        gasLimit: 400000,
      });
      console.log(res);
    } catch (e) {
      this.showError(e);
    }
  }
}
