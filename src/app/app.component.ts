import { Component, OnInit } from '@angular/core';
import { NoAccessWeb3Service } from './services/web3/no-access.service';
import { ProgressService } from './services/progress/progress.service';
import { ContractService } from './services/web3/contract.service';

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
    private readonly contractService: ContractService,
    private readonly progress: ProgressService,
  ) {
    this.progress.progress.subscribe(v => this.inProgress = v);
  }

  ngOnInit() {
    this.progress.startProgress();
    this.contractService.getAddress().subscribe(async (res: string) => {
      this.depositContractAddress = res;
      await this.updateValidatorCount(res);
      this.web3.depositEvents(this.depositContractAddress)
        .subscribe(() => this.updateValidatorCount(res));
    });
  }

  private async updateValidatorCount(address: string) {
    this.numValidators = await this.web3.numValidators(address);
    this.progress.stopProgress();
    return;
  }
}
