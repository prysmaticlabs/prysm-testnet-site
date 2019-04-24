import { Component, OnInit } from '@angular/core';
import { NoAccessWeb3Service } from './web3/no-access.service';
import { ProgressService } from './progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  numValidators: number;
  inProgress = false;
  depositContractAddress: string;
  
  constructor(
    private readonly web3: NoAccessWeb3Service,
    private readonly progress: ProgressService,
  ) {
    this.progress.progress.subscribe(v => this.inProgress = v);
    this.depositContractAddress = this.web3.depositContractAddress;
  }

  async ngOnInit() {
    await this.updateValidatorCount();

    this.web3.depositEvents().on('data', () => this.updateValidatorCount());
  }

  private async updateValidatorCount() {
    this.numValidators = await this.web3.numValidators();
    return;
  }
}
