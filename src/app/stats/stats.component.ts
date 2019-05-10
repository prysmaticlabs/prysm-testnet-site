import { Component, OnInit } from '@angular/core';
import { BlockTreeService } from './block-tree.service';
import { ProgressService } from '../progress.service';
import { BlockTreeResponse } from 'src/proto/chain_pb';
import { Subject } from 'rxjs';

interface GraphVertex {
  id: string | number;
  label: string;
  votes: number;
  numAttestations: number;
}

interface GraphEdge {
  id: string | number;
  source: string;
  target: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  inProgress = false;
  nodes: Array<GraphVertex> = [];
  links: Array<GraphEdge> = [];

  zoomToFit$: Subject<boolean> = new Subject();


  constructor(
    private readonly blockService: BlockTreeService,
    private readonly progress: ProgressService,
  ) {
    this.progress.progress.subscribe(v => this.inProgress = v);
  }

  ngOnInit() {
    this.progress.startProgress();
    this.blockService.getBlockTree().subscribe(async (res: BlockTreeResponse) => {
      const tree = this.blockService.sortTree(res.getTreeList());

      const existingParentBlocks = {};
      this.nodes = tree.map((node) => {
        const blockRoot = this.blockService.toHexString(node.getBlockRoot());
        existingParentBlocks[blockRoot] = true;
        return {
          id: blockRoot,
          label: blockRoot,
          votes: node.getVotes(),
          numAttestations: node.getBlock().getBody().getAttestationsList().length,
        };
      });

      for (let i = 0; i < this.nodes.length; i++) {
        const node = tree[i];
        const blockRoot = this.blockService.toHexString(node.getBlockRoot());
        const parentRoot = this.blockService.toHexString(node.getBlock().getParentRootHash32());
        const hasParent = existingParentBlocks[parentRoot];
        if (hasParent) {
          this.links.push({
            id: blockRoot.slice(0, 3),
            source: parentRoot,
            target: blockRoot,
          });
        }
      }
      this.progress.stopProgress();
    });
  }

  fitGraph() {
      this.zoomToFit$.next(true);
  }
}
