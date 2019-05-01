export class ValidatorIndexRequest {
  constructor ();
  getPublicKey(): {};
  setPublicKey(a: {}): void;
  toObject(): ValidatorIndexRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ValidatorIndexRequest;
}

export namespace ValidatorIndexRequest {
  export type AsObject = {
    PublicKey: {};
  }
}

export class ValidatorStatusResponse {
  constructor ();
  getStatus(): ValidatorStatus;
  setStatus(a: ValidatorStatus): void;
  getEth1DepositBlockNumber(): number;
  setEth1DepositBlockNumber(a: number): void;
  getDepositInclusionSlot(): number;
  setDepositInclusionSlot(a: number): void;
  getActivationEpoch(): number;
  setActivationEpoch(a: number): void;
  getPositionInActivationQueue(): number;
  setPositionInActivationQueue(a: number): void;
  toObject(): ValidatorStatusResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ValidatorStatusResponse;
}

export namespace ValidatorStatusResponse {
  export type AsObject = {
    Status: ValidatorStatus;
    Eth1DepositBlockNumber: number;
    DepositInclusionSlot: number;
    ActivationEpoch: number;
    PositionInActivationQueue: number;
  }
}

