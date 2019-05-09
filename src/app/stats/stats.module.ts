import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsComponent } from './stats.component';
import { BlockTreeService } from './block-tree.service';

@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
  ],
  providers: [
    BlockTreeService,
  ]
})
export class StatsModule { }
