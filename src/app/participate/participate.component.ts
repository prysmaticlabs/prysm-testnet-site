import { Component, OnInit } from '@angular/core';
import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';

import { PortisService } from '../web3/portis.service';
import { MetamaskService } from '../web3/metamask.service';
import { Web3Service, Web3Provider } from '../web3/web3.service';

const DEPOSIT_CONTRACT_ADDRESS = '0xa7F58D44b9F43AAa75fA4d030f064Bfa7Dc920c1';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss']
})
export class ParticipateComponent implements OnInit {
  private web3: Web3Service;
  web3Provider = Web3Provider;
  walletAddress: string;
  balance: string;

  constructor(
    private readonly portis: PortisService,
    private readonly metamask: MetamaskService, 
    private readonly snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
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
    const contract = this.web3.getDepositContract(DEPOSIT_CONTRACT_ADDRESS);
    const data = "0x5700000040000000956df606414c1db3873b295ff51ed926708116919ca133c4d3502a59aa54e034c482162039307fbdfd7b8e32cef3ecd65cb062ee2c82cc7b117b1d3487bea65303000000706f70080000007769746864726177";
    const res = await contract.methods.deposit(data).send({
      value: 320000,
      from: this.walletAddress,
    });
    console.log(res);
  }
}
