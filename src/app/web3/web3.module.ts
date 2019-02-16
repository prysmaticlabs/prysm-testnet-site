import { NgModule } from '@angular/core';

import { PortisService } from './portis.service';
import { MetamaskService } from './metamask.service';
import { NoAccessWeb3Service } from './no-access.service';

@NgModule({
  providers: [
    PortisService,
    MetamaskService,
    NoAccessWeb3Service,
  ],
})
export class Web3Module { }
