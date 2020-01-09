import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ChainInfoComponent } from '../../components/chain-info/chain-info.component';
import { Eth2Module } from '../../services/eth2/eth2.module';
import { CountdownModule } from '../../services/countdown/countdown.module';

@NgModule({
  declarations: [HomeComponent, ChainInfoComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    Eth2Module,
    CountdownModule,
  ],
})
export class HomeModule { }
