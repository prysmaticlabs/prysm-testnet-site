import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { MatStepper } from '@angular/material/stepper';
import { Observable, Subject, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { ethers } from 'ethers';

import { PortisService } from '../services/web3/portis.service';
import { MetamaskService } from '../services/web3/metamask.service';
import { ProgressService } from '../services/progress/progress.service';
import { FaucetService } from '../services/faucet/faucet.service';
import { DEPOSIT_AMOUNT, Web3Service, Web3Provider } from '../services/web3/web3.service';
import { environment } from '../../environments/environment';
import { ContractService } from '../services/web3/contract.service';
import { DEPOSIT_DATA_LENGTH } from './deposit-data-validator';
import { DepositData, DecodeDepositDataService } from './decode-deposit-data.service';
import { ValidatorActivationService, ValidatorStatusUpdate } from '../services/eth2/validator-activation.service';

const DEPOSIT_DATA_STORAGE_KEY = 'deposit_data';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss']
})
export class ParticipateComponent implements OnInit {
  private web3?: Web3Service;
  private pubkey: string;
  web3Provider = Web3Provider;
  walletAddress: string;
  balance: string;
  balance$?: Observable<unknown>;
  depositData: string;
  dd: DepositData; 
  depositDataFormGroup: FormGroup;
  deposited: boolean | 'pending' = false;
  depositContractAddress: string;
  validatorStatus: ValidatorStatusUpdate;
  readonly MIN_BALANCE = ethers.utils.formatEther(environment.depositAmount);
  readonly DOCKER_TAG = 'latest';

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
    private readonly depositDataService: DecodeDepositDataService,
    private readonly validatorActivationService: ValidatorActivationService,
  ) { }

  ngOnInit() {
    this.contractService.getAddress().subscribe(async (res: string) => {
      this.depositContractAddress = res;
    });
    this.depositDataFormGroup = this.formBuilder.group({
      depositDataCtrl: [''],
    });
    this.storage.getItem(DEPOSIT_DATA_STORAGE_KEY).subscribe((data: string) => {
      this.depositData = data;

      // TODO: Handle invalid input or server error.
      this.depositDataService.decodeDepositData(data).subscribe(d => {
        this.pubkey = d.pubkey;
        this.dd = d;
      });

    });
  }

  hasMinimumBalance(): boolean {
    return Number(this.balance) >= Number(this.MIN_BALANCE);
  }

  updateDepositData(data: string) {
    // setItem must be subscribed with a no-op or it won't fire the observable.
    this.storage.setItem(DEPOSIT_DATA_STORAGE_KEY, data).subscribe(() => { });

    // TODO: Handle invalid input or server error.
    this.depositDataService.decodeDepositData(data).subscribe(d => {
      this.pubkey = d.pubkey;
      this.dd = d;
    });
  }

  onKeyUp() {
    this.stepper.next();
  }

  get depositDataLength() {
    return DEPOSIT_DATA_LENGTH;
  }

  async chooseWeb3Provider(provider: Web3Provider) {
    switch (provider) {
      // Prompt user to change their network to goerli.
      case Web3Provider.METAMASK:
        this.web3 = this.metamask;
        await this.metamask.enable();
        break;
      case Web3Provider.PORTIS: this.web3 = this.portis; break;
      default: throw new Error('Unknown provider: ' + provider);
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
    const snackbarConfig = { duration: 10000 /*ms*/ };
    const confirmation$ = new Subject();
    try {
      if (!this.web3) {
        throw new Error('choose a web3 provider to make a deposit');
      }
      await this.web3.ensureSigner();

      this.deposited = 'pending';
      this.progress.startProgress();
      this.web3.depositContract(this.depositContractAddress)
        .deposit(this.dd.pubkey, this.dd.withdrawal_credentials, this.dd.signature, this.dd.deposit_data_root, {
          value: ethers.utils.parseUnits(DEPOSIT_AMOUNT, 'wei'),
          gasLimit: 400000,
        }).then((tx: { hash: string }) => {
          this.snackbar.open('Transaction received. Pending confirmation...', '', snackbarConfig);

          this.web3.eth.waitForTransaction(tx.hash, 1).then(() => confirmation$.next());
      }).catch((e: Error) => this.showError(e));
    } catch (e) {
      this.showError(e);
    }

    this.waitForActivation();

    confirmation$
      .pipe(first())
      .subscribe(() => {
        this.snackbar.open('Transaction confirmed. You are deposited!', 'OK', snackbarConfig);
        this.progress.stopProgress();
        this.deposited = true;
        // Force change detection before advancing the stepper.
        this.cdr.detectChanges();
        this.stepper.next();
      });
  }

  waitForActivation() {
    this.validatorActivationService.validatorStatus(this.pubkey).subscribe(status => {
      this.validatorStatus = status;
      console.log('updated status', status);
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
