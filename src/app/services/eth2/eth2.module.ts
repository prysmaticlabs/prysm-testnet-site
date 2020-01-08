import { NgModule } from '@angular/core';
import { ValidatorActivationService } from './validator-activation.service';
import { BeaconNodeService } from './beacon-node.service';

@NgModule({
  providers: [
    BeaconNodeService,
    ValidatorActivationService,
  ],
})
export class Eth2Module { }
