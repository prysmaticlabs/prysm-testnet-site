import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DepositData {
  pubkey: string;
  proof_of_possession: string;
  withdrawal_credentials_hash32: string;
}

@Injectable({
  providedIn: 'root'
})
export class DecodeDepositDataService {
  constructor(private http: HttpClient) { }

  decodeDepositData(deposit: string) {
    return this.http.post<DepositData>('https://prylabs.net/ssz/decodeDepositData', { data: (deposit || '').trim() });
  }
}
