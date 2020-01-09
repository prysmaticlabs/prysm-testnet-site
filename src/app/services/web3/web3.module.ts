import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { PortisService } from './portis.service';
import { MetamaskService, MetamaskTestnetDialog } from './metamask.service';
import { NoAccessWeb3Service } from './no-access.service';
import { ContractService } from './contract.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [MetamaskTestnetDialog],
  entryComponents: [MetamaskTestnetDialog],
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    HttpClient,
    ContractService,
    PortisService,
    MetamaskService,
    NoAccessWeb3Service,
  ],
})
export class Web3Module { }
