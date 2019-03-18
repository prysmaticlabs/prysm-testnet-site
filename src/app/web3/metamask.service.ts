import { Component, Injectable } from '@angular/core';
import Web3 from 'web3';
import { Web3Service } from './web3.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MetamaskService extends Web3Service {
  private readonly dialog: MatDialog;

  constructor(dialog: MatDialog) {
    try {
      super(new Web3((window as any).ethereum));
    } catch(e) {
      console.error(e);
    }
    this.dialog = dialog;
  }

  /** @override to prompt user to change their settings before panicking. */
  ensureTestnet(): Promise<void> {
    return super.ensureTestnet()
    .catch(() => this.dialog.open(MetamaskTestnetDialog, {width: '400px'})
        .afterClosed()
        .toPromise()
        .then(() => super.ensureTestnet()));
  }
}

@Component({
  selector: 'metamask-testnet-dialog',
  styles: [`
mat-dialog-content {
  font-size: 16px;
}
img {
  margin-bottom: 12px;
  margin-left: 26px;
  height: 300px;
  width: 300px;
}`],
  template: `
<h2 mat-dialog-title>Oops - Wrong network!</h2>
<mat-dialog-content>
  <img src="assets/goerli-metamask.png">
  <div>
    It looks like your metamask is not configured to use the Goerli test 
    network. Please update your metamask settings to use the custom RPC 
    endpoint provided by us: https://goerli.prylabs.net
  </div>

</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button color="primary" mat-dialog-close>I changed it</button>
</mat-dialog-actions>
`
})
export class MetamaskTestnetDialog {
  
}
