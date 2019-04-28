import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const DEPOSIT_CONTRACT_ENDPOINT = 'https://beta.prylabs.net/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private contractSub: Observable<any>;

  constructor(private http: HttpClient) {}

  /** Resolves the latest deposit contract address from the testnet */
  getAddress(): Observable<string> {
    if (!this.contractSub) {
      this.contractSub = this.http.get(DEPOSIT_CONTRACT_ENDPOINT, {responseType: 'text'});
    }
    return this.contractSub;
  }
}
