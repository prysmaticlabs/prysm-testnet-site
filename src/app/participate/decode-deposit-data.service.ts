import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ethers } from 'ethers';
import { DEPOSIT_CONTRACT_ABI } from '../web3/DepositContract';

export interface DepositData {
  pubkey: string;
  signature: string;
  withdrawal_credentials: string;
  deposit_data_root: string;
}

const contractInterface = new ethers.utils.Interface(DEPOSIT_CONTRACT_ABI);

@Injectable({
  providedIn: 'root'
})
export class DecodeDepositDataService {

  // Decode raw transaction arguments into deposit data.
  decodeDepositData(deposit: string): Observable<DepositData> {
    const args = contractInterface.parseTransaction({data: deposit.trim()}).args;

    return of({
      pubkey: args[0],
      withdrawal_credentials: args[1],
      signature: args[2],
      deposit_data_root: args[3],
    });
  }
}
