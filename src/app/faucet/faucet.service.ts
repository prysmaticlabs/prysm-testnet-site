import { Component, Injectable, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';
import { ReCaptchaV3Service, InvisibleReCaptchaComponent } from 'ngx-captcha';
import { environment } from '../../environments/environment';
import { ProgressService } from '../progress.service';
import { NoAccessWeb3Service } from '../web3/no-access.service';
import { of as  observableOf } from 'rxjs';

/** Faucet service to initiate a funding request via dialog/modal. */
@Injectable({
  providedIn: 'root'
})
export class FaucetService {
  constructor(
    private readonly dialog: MatDialog,
  ) { }
   
  /** Initiate request for funds */
  requestFunds(address: string): void {
    const dialogRef = this.dialog.open(FaucetDialog, {
      data: { address },
    });
  }
}

/** Faucet dialog component to prompt user for a faucet request. */
@Component({
  selector: 'faucet-dialog',
  templateUrl: 'faucet-dialog.html',
})
export class FaucetDialog {
  private inProgress = false;
  readonly siteKey = environment.recaptchaSiteKey;
  @ViewChild('captchaElem') captchaElem: InvisibleReCaptchaComponent;

  constructor(
    private readonly dialogRef: MatDialogRef<FaucetDialog>,
    private readonly reCaptcha: ReCaptchaV3Service,
    private readonly progress: ProgressService,
    private readonly http: HttpClient,
    private readonly snackbar: MatSnackBar,
    private readonly web3: NoAccessWeb3Service,
    @Inject(MAT_DIALOG_DATA) readonly data: { address: string },
  ){}

  /**
   * Handle successful captcha response. Calls the faucet API to make the 
   * funding request 
   */
  handleSuccess(captcha: string): void {
    console.log('captcha success', captcha);

    // TODO: Do the request
    //this.http.post(url, {address, captcha})
    //.catch(this.showError)
    observableOf({
      success: true,
      amount: "100000000000000000",
      transactionHash: 'fake-0xcdd8e1f7108af6b9e08bb27a27deb34d796ec9d0b0d225ea557265a5a963e03b',
    })
    .subscribe((data: {amount: string, transactionHash: string}) => {
      console.log('resp', data);
      const eth = this.web3.web3.utils.fromWei(data.amount, 'ether');
      this.snackbar.open(`Funded ${eth} GöETH in TX ${data.transactionHash}`);
      this.progress.stopProgress();
      this.inProgress = false;
      this.dialogRef.close();
    });
  }

  /** Make the faucet request by requesting a captcha validation. */
  request() {
    this.inProgress = true;
    this.progress.startProgress();
    this.captchaElem.execute();
  }

  /** Snackbar helper to show error */
  private showError(err: Error) {
    this.snackbar.openFromComponent(SimpleSnackBar, {
      data: { message: err, action: 'OK' },
    }); 
    this.progress.stopProgress();
  }
}
