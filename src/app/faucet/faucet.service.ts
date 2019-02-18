import { Component, Injectable, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';
import { ReCaptchaV3Service, InvisibleReCaptchaComponent } from 'ngx-captcha';
import { environment } from '../../environments/environment';
import { ProgressService } from '../progress.service';
import { NoAccessWeb3Service } from '../web3/no-access.service';
import { Subject } from 'rxjs';
import { FaucetServiceClient } from '../../proto/FaucetServiceClientPb';
import { FundingRequest, FundingResponse } from '../../proto/faucet_pb';

/** Faucet service to initiate a funding request via dialog/modal. */
@Injectable({
  providedIn: 'root'
})
export class FaucetService {
  constructor(
    private readonly dialog: MatDialog,
  ) { }
   
  /** Initiate request for funds */
  requestFunds(address: string): Promise<void> {
    return this.dialog.open(FaucetDialog, {
      data: { address },
      width: '450px',
    }).afterClosed().toPromise();
  }
}

/** Faucet dialog component to prompt user for a faucet request. */
@Component({
  selector: 'faucet-dialog',
  templateUrl: 'faucet-dialog.html',
  styleUrls: ['./faucet-dialog.scss']
})
export class FaucetDialog {
  private readonly client = new FaucetServiceClient(
    environment.apiEndpoint, 
    null /*credentials*/, 
    null/*options*/);
  inProgress = false;
  readonly siteKey = environment.recaptchaSiteKey;
  @ViewChild('captchaElem') captchaElem: InvisibleReCaptchaComponent;
  recaptcha: any;

  constructor(
    private readonly dialogRef: MatDialogRef<FaucetDialog>,
    private readonly reCaptcha: ReCaptchaV3Service,
    private readonly progress: ProgressService,
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

    // Properties must be set via setters.
    // See: https://github.com/grpc/grpc-web/issues/445
    const request = new FundingRequest();
    request.setWalletAddress(this.data.address);
    request.setRecaptchaSiteKey(this.siteKey);
    request.setRecaptchaResponse(captcha);

    const subject = new Subject<FundingResponse>();
    this.client.requestFunds(request, null, (err, resp) => {
      if (err) {
        return this.showError(new Error(err.message)); 
      }
      if (resp.getError()) {
        return this.showError(new Error(resp.getError()));
      }
      return subject.next(resp);
    });

    subject
    .subscribe(data => {
      console.log('resp', data);
      const eth = this.web3.web3.utils.fromWei(data.getAmount(), 'ether');
      this.snackbar.open(`Funded ${eth} GöETH in transaction ${data.getTransactionhash()}`);
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
