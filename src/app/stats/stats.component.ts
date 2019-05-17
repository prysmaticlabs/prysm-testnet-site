import { Component, OnInit } from '@angular/core';
import { BlockTreeService } from './block-tree.service';
import { ProgressService } from '../progress.service';
import { BlockTreeResponse } from '../../proto/chain_pb';
import { Subject, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import BigNumber from 'bignumber.js';

interface GraphVertex {
  id: string | number;
  label: string;
  isJustified: boolean;
  participatedVotes: string;
  totalVotes: string;
  numAttestations: number;
  numDeposits: number;
  slot: string;
}

interface GraphEdge {
  id: string | number;
  source: string;
  target: string;
}

const GENESIS_SLOT = '9223372036854775808';
const MAX_DEPOSIT_AMOUNT = 3200000000;
const SLOT_DURATION_MILLISECONDS = 6000;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  inProgress = false;
  nodes: Array<GraphVertex> = [];
  links: Array<GraphEdge> = [];

  constructor(
    private readonly blockService: BlockTreeService,
    private readonly progress: ProgressService,
  ) {
    this.progress.progress.subscribe(v => this.inProgress = v);
  }

  // slotPoll() {
  //   return interval(SLOT_DURATION_MILLISECONDS)
  //     .pipe(
  //       switchMap(() => {
  //         this.progress.startProgress();
  //         return this.blockService.getBlockTree();
  //       }), 
  //       // distinctUntilChanged(), // only emit and redraw graph if the value has actually changed
  //     );
  // }

  ngOnInit() {
    this.blockService.getBlockTree().subscribe(async (res: BlockTreeResponse) => {
      const tree = this.blockService.sortTree(res.getTreeList());
      const existingParentBlocks = {};
      this.nodes = tree.map((node, idx) => {
        const blockRoot = this.blockService.toHexString(node.getBlockRoot());
        existingParentBlocks[blockRoot] = true;

        let participatedVotesString = Math.floor(node.getParticipatedVotes() / MAX_DEPOSIT_AMOUNT).toString();
        if (participatedVotesString.indexOf('.') === -1) {
          participatedVotesString += '.';
        }
        while (participatedVotesString.length < participatedVotesString.indexOf('.') + 15) {
          participatedVotesString += '0';
        }
        let totalVotesString = Math.floor(node.getParticipatedVotes() / MAX_DEPOSIT_AMOUNT).toString();
        if (totalVotesString.indexOf('.') === -1) {
          totalVotesString += '.';
        }
        while (totalVotesString.length < totalVotesString.indexOf('.') + 15) {
          totalVotesString += '0';
        }
        return {
          id: blockRoot,
          label: blockRoot,
          isJustified: idx === 0,
          participatedVotes: participatedVotesString,
          totalVotes: totalVotesString,
          numAttestations: node.getBlock().getBody().getAttestationsList().length,
          numDeposits: node.getBlock().getBody().getDepositsList().length,
          slot: (new BigNumber(node.getBlock().getSlot()).minus(new BigNumber(GENESIS_SLOT))).toString(),
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
      // this.update$.next(true);
      // this.center$.next(true);
      // this.progress.stopProgress();
    });
  }
}
