/**
 * @fileoverview gRPC-Web generated client stub for ethereum.beacon.rpc.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';
import {
  ValidatorIndexRequest,
  ValidatorStatusResponse} from './validator_pb';

export class ValidatorServiceClient {
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

  methodInfoValidatorStatus = new grpcWeb.AbstractClientBase.MethodInfo(
    ValidatorStatusResponse,
    (request: ValidatorIndexRequest) => {
      return request.serializeBinary();
    },
    ValidatorStatusResponse.deserializeBinary
  );

  validatorStatus(
    request: ValidatorIndexRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ValidatorStatusResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/ethereum.beacon.rpc.v1.ValidatorService/ValidatorStatus',
      request,
      metadata,
      this.methodInfoValidatorStatus,
      callback);
  }

}

