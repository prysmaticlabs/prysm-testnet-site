import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { BeaconServiceClient } from '../../proto/ChainServiceClientPb';
import { BlockTreeResponse } from '../../proto/chain_pb';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlockTreeService {
  private readonly client = new BeaconServiceClient(
    environment.apiEndpoint,
    null /* credentials */,
    null /* options */,
  );

  getBlockTree() {
    return new Observable<BlockTreeResponse>((observer) => {
      this.client.blockTree({}, null/*metadata*/, (err, resp) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(resp);
        }
      });
    }).pipe(retry(5));
  }
}
