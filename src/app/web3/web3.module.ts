import { NgModule } from '@angular/core';

import { PortisService } from './portis.service';
import { MetamaskService } from './metamask.service';

@NgModule({
  providers: [
    PortisService,
    MetamaskService,
  ],
})
export class Web3Module { }
