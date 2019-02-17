/**
 * @fileoverview gRPC-Web generated client stub for faucet
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';
import {
  FundingRequest,
  FundingResponse} from './faucet_pb';

export class FaucetServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; }) {
    if (!options) options = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoRequestFunds = new grpcWeb.AbstractClientBase.MethodInfo(
    FundingResponse,
    (request: FundingRequest) => {
      return request.serializeBinary();
    },
    FundingResponse.deserializeBinary
  );

  requestFunds(
    request: FundingRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: FundingResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/faucet.FaucetService/RequestFunds',
      request,
      metadata,
      this.methodInfoRequestFunds,
      callback);
  }

}

