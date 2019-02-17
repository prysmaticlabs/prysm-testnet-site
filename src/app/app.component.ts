import { Component, OnInit } from '@angular/core';
import { NoAccessWeb3Service } from './web3/no-access.service';
import { ProgressService } from './progress.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  numValidators: number;
  inProgress = false;
  depositContractAddress = environment.depositContractAddress;
  
  constructor(
    private readonly web3: NoAccessWeb3Service,
    private readonly progress: ProgressService,
  ) {
    this.progress.progress.subscribe(v => this.inProgress = v);
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
