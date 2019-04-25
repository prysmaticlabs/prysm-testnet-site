import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const DEPOSIT_CONTRACT_ENDPOINT = 'https://beta.prylabs.net/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  public contractSub: Observable<any>;

  constructor(private http: HttpClient) {}

  fetchDepositContract(): Observable<any> {
    if (!this.contractSub) {
      this.contractSub = this.http.get(DEPOSIT_CONTRACT_ENDPOINT);
    }
    return this.contractSub;
  }
}
