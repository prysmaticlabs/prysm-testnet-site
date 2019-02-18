import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';

import { FaucetModule } from '../faucet/faucet.module';
import { Web3Module } from '../web3/web3.module';
import { ParticipateComponent } from './participate.component';

@NgModule({
  declarations: [ParticipateComponent],
  imports: [
    CommonModule,
    FaucetModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatStepperModule,
    Web3Module,
  ]
})
export class ParticipateModule { }
