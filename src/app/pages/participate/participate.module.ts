import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FaucetModule } from '../../services/faucet/faucet.module';
import { Web3Module } from '../../services/web3/web3.module';
import { ParticipateComponent } from './participate.component';
import { DepositDataValidatorDirective, } from './deposit-data-validator';
import { DecodeDepositDataService } from './decode-deposit-data.service';
import { Eth2Module } from '../../services/eth2/eth2.module';

@NgModule({
  declarations: [
    DepositDataValidatorDirective,
    ParticipateComponent,
  ],
  imports: [
    CommonModule,
    FaucetModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatStepperModule,
    ReactiveFormsModule,
    Web3Module,
    Eth2Module,
  ],
  providers: [
    DecodeDepositDataService,
  ],
})
export class ParticipateModule { }
