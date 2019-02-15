import { Component, OnInit } from '@angular/core';
import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';

import { PortisService } from '../web3/portis.service';
import { MetamaskService } from '../web3/metamask.service';
import { Web3Service, Web3Provider } from '../web3/web3.service';

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
}
