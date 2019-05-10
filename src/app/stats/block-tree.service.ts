import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { BeaconServiceClient } from '../../proto/ChainServiceClientPb';
import { BlockTreeResponse } from '../../proto/chain_pb';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

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
      const req: Empty = new Empty();
      this.client.blockTree(req, null/*metadata*/, (err, resp) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(resp);
        }
      });
    }).pipe(retry(5));
  }

  sortTree(nodes: Array<BlockTreeResponse.TreeNode>) {
    return nodes.sort((a: BlockTreeResponse.TreeNode, b: BlockTreeResponse.TreeNode) => {
      return (a.getBlock().getSlot() > b.getBlock().getSlot()) ? 1 : -1;
    });
  }

  extractBlockRoots(nodes: Array<BlockTreeResponse.TreeNode>) {
    return nodes.map((n) => {
      return this.toHexString(n.getBlockRoot());
    });
  }

  toHexString(byteArray: string | Uint8Array) {
    return Array.prototype.map.call(byteArray, (byte) => {
      return ('0x' + (byte & 0xFF).toString(16));
    }).join('');
  }
}
