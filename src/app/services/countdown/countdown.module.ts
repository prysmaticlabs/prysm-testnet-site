import { NgModule } from '@angular/core';
import { CountdownService } from './countdown.service';

@NgModule({
  providers: [
    CountdownService,
  ],
})
export class CountdownModule { }
