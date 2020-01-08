import { Component, OnInit } from '@angular/core';
import { BeaconNodeService } from 'src/app/services/eth2/beacon-node.service';
import { CountdownService, IInterval } from 'src/app/services/countdown/countdown.service';

@Component({
  selector: 'app-chain-info',
  templateUrl: './chain-info.component.html',
  styleUrls: ['./chain-info.component.scss']
})
export class ChainInfoComponent implements OnInit {
  genesisTime: Date;
  countingDown: boolean;
  countdown: IInterval;

  constructor(
    private readonly beaconNodeService: BeaconNodeService,
    private readonly countdownService: CountdownService,
  ) { }

  ngOnInit() {
    this.beaconNodeService.getGenesisTime().subscribe(
      t => {
        console.log(t);
        this.genesisTime = t;
        const unixTimestamp = t.getTime();
        this.countdownService.getCountDown(unixTimestamp).subscribe(
          latestCountdownValue  => {
            this.countdown = latestCountdownValue;
            this.countingDown = true;
          },
          error => console.error(error),
          () => {
            this.countingDown = false;
          }
        );
      },
      err => {
        console.error(err);
      }
    );
  }
}
