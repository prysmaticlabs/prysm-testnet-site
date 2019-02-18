import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FaucetDialog, FaucetService } from './faucet.service';

@NgModule({
  declarations: [FaucetDialog],
  entryComponents: [FaucetDialog],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    NgxCaptchaModule,
  ],
  providers: [
    FaucetService,
  ],
})
export class FaucetModule { }
