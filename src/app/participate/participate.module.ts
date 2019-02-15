import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { Web3Module } from '../web3/web3.module';
import { ParticipateComponent } from './participate.component';

@NgModule({
  declarations: [ParticipateComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    Web3Module,
  ]
})
export class ParticipateModule { }
