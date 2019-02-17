export class FundingRequest {
  constructor ();
  getWalletAddress(): string;
  setWalletAddress(a: string): void;
  getRecaptchaSiteKey(): string;
  setRecaptchaSiteKey(a: string): void;
  getRecaptchaResponse(): string;
  setRecaptchaResponse(a: string): void;
  toObject(): FundingRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => FundingRequest;
}

export namespace FundingRequest {
  export type AsObject = {
    WalletAddress: string;
    RecaptchaSiteKey: string;
    RecaptchaResponse: string;
  }
}

export class FundingResponse {
  constructor ();
  getError(): string;
  setError(a: string): void;
  getAmount(): string;
  setAmount(a: string): void;
  getTransactionhash(): string;
  setTransactionhash(a: string): void;
  toObject(): FundingResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => FundingResponse;
}

export namespace FundingResponse {
  export type AsObject = {
    Error: string;
    Amount: string;
    Transactionhash: string;
  }
}

