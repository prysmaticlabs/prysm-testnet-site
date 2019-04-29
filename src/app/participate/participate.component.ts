import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { MatStepper } from '@angular/material/stepper';
import { Observable, Subject, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { ethers } from 'ethers';

import { PortisService } from '../web3/portis.service';
import { MetamaskService } from '../web3/metamask.service';
import { ProgressService } from '../progress.service';
import { FaucetService } from '../faucet/faucet.service';
import { DEPOSIT_AMOUNT,  Web3Service, Web3Provider } from '../web3/web3.service';
import { environment } from '../../environments/environment';
import { ContractService } from '../web3/contract.service';

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
  balance$?: Observable<unknown>;
  depositData: string;
  depositDataFormGroup: FormGroup;
  deposited: boolean|'pending'  = false;
  depositContractAddress: string;
  readonly MIN_BALANCE = ethers.utils.formatEther(environment.depositAmount);
  readonly DOCKER_TAG = "latest";

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private readonly portis: PortisService,
    private readonly metamask: MetamaskService,
    private readonly snackbar: MatSnackBar,
    private readonly storage: LocalStorage,
    private readonly progress: ProgressService,
    private readonly faucet: FaucetService,
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly contractService: ContractService,
  ) {}

  ngOnInit() {
    this.contractService.getAddress().subscribe(async (res: string) => {
      this.depositContractAddress = res;
    });
    this.depositDataFormGroup = this.formBuilder.group({
      depositDataCtrl: [''],
    });
    this.storage.getItem(DEPOSIT_DATA_STORAGE_KEY).subscribe((data: string) => {
      this.depositData = data;
    });
  }

  hasMinimumBalance(): boolean {
    return Number(this.balance) >= Number(this.MIN_BALANCE);
  }

  updateDepositData(data: string) {
    // setItem must be subscribed with a no-op or it won't fire the observable.
    this.storage.setItem(DEPOSIT_DATA_STORAGE_KEY, data).subscribe(() => {});
  }

  onKeyUp() {
    this.stepper.next();
  }

  async chooseWeb3Provider(provider: Web3Provider) {
    switch(provider) {
      // Prompt user to change their network to goerli.
      case Web3Provider.METAMASK: this.web3 = this.metamask; break;
      case Web3Provider.PORTIS: this.web3 = this.portis; break;
      default: throw new Error("Unknown provider: " + provider);
    }

    try {
      await this.web3.ensureTestnet();
    } catch (e) {
      return this.showError(e);
    }
   
    await this.updateBalance();
    this.balance$ = interval(5000 /*ms*/);
    this.balance$.subscribe(async () => {
      await this.updateBalance();
    });
  }

  async makeDeposit() {
    const snackbarConfig = {duration: 10000 /*ms*/};
    const confirmation$ = new Subject();
    try {
      if (!this.web3) {
        throw new Error('choose a web3 provider to make a deposit');
      }
      await this.web3.ensureSigner();

      this.deposited = 'pending';
      this.progress.startProgress();
      this.web3.depositContract(this.depositContractAddress).deposit(this.depositData.trim(), {
        value: ethers.utils.parseUnits(DEPOSIT_AMOUNT, 'wei'),
        gasLimit: 400000,
      }).then((tx: {hash: string}) => {
        this.snackbar.open('Transaction received. Pending confirmation...', '', snackbarConfig);

        this.web3.eth.waitForTransaction(tx.hash, 1).then(() => confirmation$.next());
      }).catch(e => this.showError(e));
    } catch (e) {
      this.showError(e);
    }

    confirmation$
      .pipe(first())
      .subscribe(async () => {
        this.snackbar.open('Transaction confirmed. You are deposited!', 'OK', snackbarConfig);
        this.progress.stopProgress();
        this.deposited = true;
        // Force change detection before advancing the stepper. 
        this.cdr.detectChanges(); 
        this.stepper.next();
      });
  }

  /** Method to prompt funding request from the faucet service. */
  requestFaucetFunds() {
    this.faucet.requestFunds(this.walletAddress)
      .then((amt: string) => {
        this.balance = String(Number(this.balance) + Number(amt));
       });
  }

  private async updateBalance() {
    const accounts = await this.web3.queryAccounts();
    this.walletAddress = accounts[0];
    this.balance = await this.web3.ethBalanceOf(this.walletAddress);
  }

  /** Snackbar helper to show errors. */
  private showError(err: Error) {
    this.snackbar.openFromComponent(SimpleSnackBar, {
      data: { message: err, action: 'OK' },
    }); 
    this.progress.stopProgress();
  }
}
