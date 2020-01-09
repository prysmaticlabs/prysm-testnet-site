import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  map,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const ETH2_API_URL = 'https://api.prylabs.net/eth/v1alpha1';

@Injectable({
  providedIn: 'root'
})
export class BeaconNodeService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  getGenesisTime(): Observable<Date> {
    return this.http.get(ETH2_API_URL + '/node/genesis').pipe(
      map((res: {genesisTime: string}) => new Date(Date.parse(res.genesisTime)))
    );
  }

  getNumActiveValidators(): Observable<number> {
    return this.http.get(ETH2_API_URL + '/beacon/committees').pipe(
      map((res: {
        epoch: number,
        committees: Array<any>,
        activeValidatorCount: number,
      }) => {
        return res.activeValidatorCount;
      })
    );
  }
}
