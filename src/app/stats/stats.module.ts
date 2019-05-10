import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { StatsComponent } from './stats.component';
import { BlockTreeService } from './block-tree.service';

@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    NgxGraphModule,
  ],
  providers: [
    BlockTreeService,
  ]
})
export class StatsModule { }
