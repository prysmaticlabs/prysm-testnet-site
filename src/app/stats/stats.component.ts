import { Component, OnInit } from '@angular/core';
import { BlockTreeService } from './block-tree.service';
import { ProgressService } from '../progress.service';
import { BlockTreeResponse } from 'src/proto/chain_pb';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  inProgress = false;
  numElements = 0;

  constructor(
    private readonly blockService: BlockTreeService,
    private readonly progress: ProgressService,
  ) {
    this.progress.progress.subscribe(v => this.inProgress = v);
  }

  ngOnInit() {
    this.progress.startProgress();
    this.blockService.getBlockTree().subscribe(async (res: BlockTreeResponse) => {
      this.numElements = res.getTreeList().length;
      console.log(res);
      this.progress.stopProgress();
    });
  }

}
