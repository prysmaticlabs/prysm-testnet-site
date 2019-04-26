import { Component, OnInit } from '@angular/core';
import { NoAccessWeb3Service } from './web3/no-access.service';
import { ProgressService } from './progress.service';
import { ContractService } from './web3/contract.service';

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
    this.contractService.getAddress().subscribe(async (res: any) => {
      this.depositContractAddress = res;
      await this.updateValidatorCount(res);
      this.web3.depositEvents(this.depositContractAddress).on('data', () => this.updateValidatorCount(res));
    });
  }

  private async updateValidatorCount(address: string) {
    this.numValidators = await this.web3.numValidators(address);
    return;
  }
}
