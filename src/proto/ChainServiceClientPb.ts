/**
 * @fileoverview gRPC-Web generated client stub for ethereum.beacon.rpc.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {BlockTreeResponse} from './chain_pb';

export class BeaconServiceClient {
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

  methodInfoBlockTree = new grpcWeb.AbstractClientBase.MethodInfo(
    BlockTreeResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    BlockTreeResponse.deserializeBinary
  );

  blockTree(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BlockTreeResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/ethereum.beacon.rpc.v1.BeaconService/BlockTree',
      request,
      metadata || {},
      this.methodInfoBlockTree,
      callback);
  }

}

