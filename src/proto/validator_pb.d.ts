import * as jspb from "google-protobuf"

export class ValidatorIndexRequest extends jspb.Message {
  getPublicKey(): Uint8Array | string;
  getPublicKey_asU8(): Uint8Array;
  getPublicKey_asB64(): string;
  setPublicKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidatorIndexRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ValidatorIndexRequest): ValidatorIndexRequest.AsObject;
  static serializeBinaryToWriter(message: ValidatorIndexRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidatorIndexRequest;
  static deserializeBinaryFromReader(message: ValidatorIndexRequest, reader: jspb.BinaryReader): ValidatorIndexRequest;
}

export namespace ValidatorIndexRequest {
  export type AsObject = {
    publicKey: Uint8Array | string,
  }
}

export class ValidatorStatusResponse extends jspb.Message {
  getStatus(): ValidatorStatus;
  setStatus(value: ValidatorStatus): void;

  getEth1DepositBlockNumber(): number;
  setEth1DepositBlockNumber(value: number): void;

  getDepositInclusionSlot(): number;
  setDepositInclusionSlot(value: number): void;

  getActivationEpoch(): number;
  setActivationEpoch(value: number): void;

  getPositionInActivationQueue(): number;
  setPositionInActivationQueue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidatorStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ValidatorStatusResponse): ValidatorStatusResponse.AsObject;
  static serializeBinaryToWriter(message: ValidatorStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidatorStatusResponse;
  static deserializeBinaryFromReader(message: ValidatorStatusResponse, reader: jspb.BinaryReader): ValidatorStatusResponse;
}

export namespace ValidatorStatusResponse {
  export type AsObject = {
    status: ValidatorStatus,
    eth1DepositBlockNumber: number,
    depositInclusionSlot: number,
    activationEpoch: number,
    positionInActivationQueue: number,
  }
}

export enum ValidatorStatus { 
  UNKNOWN_STATUS = 0,
  PENDING_ACTIVE = 1,
  ACTIVE = 2,
  INITIATED_EXIT = 3,
  WITHDRAWABLE = 4,
  EXITED = 5,
  EXITED_SLASHED = 6,
}
