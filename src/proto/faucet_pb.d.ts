import * as jspb from "google-protobuf"

export class FundingRequest extends jspb.Message {
  getWalletAddress(): string;
  setWalletAddress(value: string): void;

  getRecaptchaSiteKey(): string;
  setRecaptchaSiteKey(value: string): void;

  getRecaptchaResponse(): string;
  setRecaptchaResponse(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FundingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FundingRequest): FundingRequest.AsObject;
  static serializeBinaryToWriter(message: FundingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FundingRequest;
  static deserializeBinaryFromReader(message: FundingRequest, reader: jspb.BinaryReader): FundingRequest;
}

export namespace FundingRequest {
  export type AsObject = {
    walletAddress: string,
    recaptchaSiteKey: string,
    recaptchaResponse: string,
  }
}

export class FundingResponse extends jspb.Message {
  getError(): string;
  setError(value: string): void;

  getAmount(): string;
  setAmount(value: string): void;

  getTransactionhash(): string;
  setTransactionhash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FundingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FundingResponse): FundingResponse.AsObject;
  static serializeBinaryToWriter(message: FundingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FundingResponse;
  static deserializeBinaryFromReader(message: FundingResponse, reader: jspb.BinaryReader): FundingResponse;
}

export namespace FundingResponse {
  export type AsObject = {
    error: string,
    amount: string,
    transactionhash: string,
  }
}

