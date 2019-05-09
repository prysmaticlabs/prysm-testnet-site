import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class BlockTreeResponse extends jspb.Message {
  getTreeList(): Array<BlockTreeResponse.TreeNode>;
  setTreeList(value: Array<BlockTreeResponse.TreeNode>): void;
  clearTreeList(): void;
  addTree(value?: BlockTreeResponse.TreeNode, index?: number): BlockTreeResponse.TreeNode;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockTreeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BlockTreeResponse): BlockTreeResponse.AsObject;
  static serializeBinaryToWriter(message: BlockTreeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockTreeResponse;
  static deserializeBinaryFromReader(message: BlockTreeResponse, reader: jspb.BinaryReader): BlockTreeResponse;
}

export namespace BlockTreeResponse {
  export type AsObject = {
    treeList: Array<BlockTreeResponse.TreeNode.AsObject>,
  }

  export class TreeNode extends jspb.Message {
    getBlock(): BeaconBlock | undefined;
    setBlock(value?: BeaconBlock): void;
    hasBlock(): boolean;
    clearBlock(): void;

    getBlockRoot(): Uint8Array | string;
    getBlockRoot_asU8(): Uint8Array;
    getBlockRoot_asB64(): string;
    setBlockRoot(value: Uint8Array | string): void;

    getVotes(): number;
    setVotes(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TreeNode.AsObject;
    static toObject(includeInstance: boolean, msg: TreeNode): TreeNode.AsObject;
    static serializeBinaryToWriter(message: TreeNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TreeNode;
    static deserializeBinaryFromReader(message: TreeNode, reader: jspb.BinaryReader): TreeNode;
  }

  export namespace TreeNode {
    export type AsObject = {
      block?: BeaconBlock.AsObject,
      blockRoot: Uint8Array | string,
      votes: number,
    }
  }

}

export class BeaconBlock extends jspb.Message {
  getSlot(): number;
  setSlot(value: number): void;

  getParentRootHash32(): Uint8Array | string;
  getParentRootHash32_asU8(): Uint8Array;
  getParentRootHash32_asB64(): string;
  setParentRootHash32(value: Uint8Array | string): void;

  getStateRootHash32(): Uint8Array | string;
  getStateRootHash32_asU8(): Uint8Array;
  getStateRootHash32_asB64(): string;
  setStateRootHash32(value: Uint8Array | string): void;

  getRandaoReveal(): Uint8Array | string;
  getRandaoReveal_asU8(): Uint8Array;
  getRandaoReveal_asB64(): string;
  setRandaoReveal(value: Uint8Array | string): void;

  getEth1Data(): Eth1Data | undefined;
  setEth1Data(value?: Eth1Data): void;
  hasEth1Data(): boolean;
  clearEth1Data(): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  getBody(): BeaconBlockBody | undefined;
  setBody(value?: BeaconBlockBody): void;
  hasBody(): boolean;
  clearBody(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconBlock.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconBlock): BeaconBlock.AsObject;
  static serializeBinaryToWriter(message: BeaconBlock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconBlock;
  static deserializeBinaryFromReader(message: BeaconBlock, reader: jspb.BinaryReader): BeaconBlock;
}

export namespace BeaconBlock {
  export type AsObject = {
    slot: number,
    parentRootHash32: Uint8Array | string,
    stateRootHash32: Uint8Array | string,
    randaoReveal: Uint8Array | string,
    eth1Data?: Eth1Data.AsObject,
    signature: Uint8Array | string,
    body?: BeaconBlockBody.AsObject,
  }
}

export class BeaconBlockBody extends jspb.Message {
  getAttestationsList(): Array<Attestation>;
  setAttestationsList(value: Array<Attestation>): void;
  clearAttestationsList(): void;
  addAttestations(value?: Attestation, index?: number): Attestation;

  getProposerSlashingsList(): Array<ProposerSlashing>;
  setProposerSlashingsList(value: Array<ProposerSlashing>): void;
  clearProposerSlashingsList(): void;
  addProposerSlashings(value?: ProposerSlashing, index?: number): ProposerSlashing;

  getAttesterSlashingsList(): Array<AttesterSlashing>;
  setAttesterSlashingsList(value: Array<AttesterSlashing>): void;
  clearAttesterSlashingsList(): void;
  addAttesterSlashings(value?: AttesterSlashing, index?: number): AttesterSlashing;

  getDepositsList(): Array<Deposit>;
  setDepositsList(value: Array<Deposit>): void;
  clearDepositsList(): void;
  addDeposits(value?: Deposit, index?: number): Deposit;

  getVoluntaryExitsList(): Array<VoluntaryExit>;
  setVoluntaryExitsList(value: Array<VoluntaryExit>): void;
  clearVoluntaryExitsList(): void;
  addVoluntaryExits(value?: VoluntaryExit, index?: number): VoluntaryExit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconBlockBody.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconBlockBody): BeaconBlockBody.AsObject;
  static serializeBinaryToWriter(message: BeaconBlockBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconBlockBody;
  static deserializeBinaryFromReader(message: BeaconBlockBody, reader: jspb.BinaryReader): BeaconBlockBody;
}

export namespace BeaconBlockBody {
  export type AsObject = {
    attestationsList: Array<Attestation.AsObject>,
    proposerSlashingsList: Array<ProposerSlashing.AsObject>,
    attesterSlashingsList: Array<AttesterSlashing.AsObject>,
    depositsList: Array<Deposit.AsObject>,
    voluntaryExitsList: Array<VoluntaryExit.AsObject>,
  }
}

export class Attestation extends jspb.Message {
  getData(): AttestationData | undefined;
  setData(value?: AttestationData): void;
  hasData(): boolean;
  clearData(): void;

  getAggregationBitfield(): Uint8Array | string;
  getAggregationBitfield_asU8(): Uint8Array;
  getAggregationBitfield_asB64(): string;
  setAggregationBitfield(value: Uint8Array | string): void;

  getCustodyBitfield(): Uint8Array | string;
  getCustodyBitfield_asU8(): Uint8Array;
  getCustodyBitfield_asB64(): string;
  setCustodyBitfield(value: Uint8Array | string): void;

  getAggregateSignature(): Uint8Array | string;
  getAggregateSignature_asU8(): Uint8Array;
  getAggregateSignature_asB64(): string;
  setAggregateSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Attestation.AsObject;
  static toObject(includeInstance: boolean, msg: Attestation): Attestation.AsObject;
  static serializeBinaryToWriter(message: Attestation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Attestation;
  static deserializeBinaryFromReader(message: Attestation, reader: jspb.BinaryReader): Attestation;
}

export namespace Attestation {
  export type AsObject = {
    data?: AttestationData.AsObject,
    aggregationBitfield: Uint8Array | string,
    custodyBitfield: Uint8Array | string,
    aggregateSignature: Uint8Array | string,
  }
}

export class AttestationData extends jspb.Message {
  getSlot(): number;
  setSlot(value: number): void;

  getShard(): number;
  setShard(value: number): void;

  getBeaconBlockRootHash32(): Uint8Array | string;
  getBeaconBlockRootHash32_asU8(): Uint8Array;
  getBeaconBlockRootHash32_asB64(): string;
  setBeaconBlockRootHash32(value: Uint8Array | string): void;

  getEpochBoundaryRootHash32(): Uint8Array | string;
  getEpochBoundaryRootHash32_asU8(): Uint8Array;
  getEpochBoundaryRootHash32_asB64(): string;
  setEpochBoundaryRootHash32(value: Uint8Array | string): void;

  getCrosslinkDataRootHash32(): Uint8Array | string;
  getCrosslinkDataRootHash32_asU8(): Uint8Array;
  getCrosslinkDataRootHash32_asB64(): string;
  setCrosslinkDataRootHash32(value: Uint8Array | string): void;

  getLatestCrosslink(): Crosslink | undefined;
  setLatestCrosslink(value?: Crosslink): void;
  hasLatestCrosslink(): boolean;
  clearLatestCrosslink(): void;

  getJustifiedEpoch(): number;
  setJustifiedEpoch(value: number): void;

  getJustifiedBlockRootHash32(): Uint8Array | string;
  getJustifiedBlockRootHash32_asU8(): Uint8Array;
  getJustifiedBlockRootHash32_asB64(): string;
  setJustifiedBlockRootHash32(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AttestationData.AsObject;
  static toObject(includeInstance: boolean, msg: AttestationData): AttestationData.AsObject;
  static serializeBinaryToWriter(message: AttestationData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AttestationData;
  static deserializeBinaryFromReader(message: AttestationData, reader: jspb.BinaryReader): AttestationData;
}

export namespace AttestationData {
  export type AsObject = {
    slot: number,
    shard: number,
    beaconBlockRootHash32: Uint8Array | string,
    epochBoundaryRootHash32: Uint8Array | string,
    crosslinkDataRootHash32: Uint8Array | string,
    latestCrosslink?: Crosslink.AsObject,
    justifiedEpoch: number,
    justifiedBlockRootHash32: Uint8Array | string,
  }
}

export class ProposalSignedData extends jspb.Message {
  getSlot(): number;
  setSlot(value: number): void;

  getShard(): number;
  setShard(value: number): void;

  getBlockRootHash32(): Uint8Array | string;
  getBlockRootHash32_asU8(): Uint8Array;
  getBlockRootHash32_asB64(): string;
  setBlockRootHash32(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProposalSignedData.AsObject;
  static toObject(includeInstance: boolean, msg: ProposalSignedData): ProposalSignedData.AsObject;
  static serializeBinaryToWriter(message: ProposalSignedData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProposalSignedData;
  static deserializeBinaryFromReader(message: ProposalSignedData, reader: jspb.BinaryReader): ProposalSignedData;
}

export namespace ProposalSignedData {
  export type AsObject = {
    slot: number,
    shard: number,
    blockRootHash32: Uint8Array | string,
  }
}

export class SlashableAttestation extends jspb.Message {
  getValidatorIndicesList(): Array<number>;
  setValidatorIndicesList(value: Array<number>): void;
  clearValidatorIndicesList(): void;
  addValidatorIndices(value: number, index?: number): void;

  getCustodyBitfield(): Uint8Array | string;
  getCustodyBitfield_asU8(): Uint8Array;
  getCustodyBitfield_asB64(): string;
  setCustodyBitfield(value: Uint8Array | string): void;

  getData(): AttestationData | undefined;
  setData(value?: AttestationData): void;
  hasData(): boolean;
  clearData(): void;

  getAggregateSignature(): Uint8Array | string;
  getAggregateSignature_asU8(): Uint8Array;
  getAggregateSignature_asB64(): string;
  setAggregateSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SlashableAttestation.AsObject;
  static toObject(includeInstance: boolean, msg: SlashableAttestation): SlashableAttestation.AsObject;
  static serializeBinaryToWriter(message: SlashableAttestation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SlashableAttestation;
  static deserializeBinaryFromReader(message: SlashableAttestation, reader: jspb.BinaryReader): SlashableAttestation;
}

export namespace SlashableAttestation {
  export type AsObject = {
    validatorIndicesList: Array<number>,
    custodyBitfield: Uint8Array | string,
    data?: AttestationData.AsObject,
    aggregateSignature: Uint8Array | string,
  }
}

export class ProposerSlashing extends jspb.Message {
  getProposerIndex(): number;
  setProposerIndex(value: number): void;

  getProposalData1(): ProposalSignedData | undefined;
  setProposalData1(value?: ProposalSignedData): void;
  hasProposalData1(): boolean;
  clearProposalData1(): void;

  getProposalSignature1(): Uint8Array | string;
  getProposalSignature1_asU8(): Uint8Array;
  getProposalSignature1_asB64(): string;
  setProposalSignature1(value: Uint8Array | string): void;

  getProposalData2(): ProposalSignedData | undefined;
  setProposalData2(value?: ProposalSignedData): void;
  hasProposalData2(): boolean;
  clearProposalData2(): void;

  getProposalSignature2(): Uint8Array | string;
  getProposalSignature2_asU8(): Uint8Array;
  getProposalSignature2_asB64(): string;
  setProposalSignature2(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProposerSlashing.AsObject;
  static toObject(includeInstance: boolean, msg: ProposerSlashing): ProposerSlashing.AsObject;
  static serializeBinaryToWriter(message: ProposerSlashing, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProposerSlashing;
  static deserializeBinaryFromReader(message: ProposerSlashing, reader: jspb.BinaryReader): ProposerSlashing;
}

export namespace ProposerSlashing {
  export type AsObject = {
    proposerIndex: number,
    proposalData1?: ProposalSignedData.AsObject,
    proposalSignature1: Uint8Array | string,
    proposalData2?: ProposalSignedData.AsObject,
    proposalSignature2: Uint8Array | string,
  }
}

export class AttesterSlashing extends jspb.Message {
  getSlashableAttestation1(): SlashableAttestation | undefined;
  setSlashableAttestation1(value?: SlashableAttestation): void;
  hasSlashableAttestation1(): boolean;
  clearSlashableAttestation1(): void;

  getSlashableAttestation2(): SlashableAttestation | undefined;
  setSlashableAttestation2(value?: SlashableAttestation): void;
  hasSlashableAttestation2(): boolean;
  clearSlashableAttestation2(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AttesterSlashing.AsObject;
  static toObject(includeInstance: boolean, msg: AttesterSlashing): AttesterSlashing.AsObject;
  static serializeBinaryToWriter(message: AttesterSlashing, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AttesterSlashing;
  static deserializeBinaryFromReader(message: AttesterSlashing, reader: jspb.BinaryReader): AttesterSlashing;
}

export namespace AttesterSlashing {
  export type AsObject = {
    slashableAttestation1?: SlashableAttestation.AsObject,
    slashableAttestation2?: SlashableAttestation.AsObject,
  }
}

export class Crosslink extends jspb.Message {
  getEpoch(): number;
  setEpoch(value: number): void;

  getCrosslinkDataRootHash32(): Uint8Array | string;
  getCrosslinkDataRootHash32_asU8(): Uint8Array;
  getCrosslinkDataRootHash32_asB64(): string;
  setCrosslinkDataRootHash32(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Crosslink.AsObject;
  static toObject(includeInstance: boolean, msg: Crosslink): Crosslink.AsObject;
  static serializeBinaryToWriter(message: Crosslink, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Crosslink;
  static deserializeBinaryFromReader(message: Crosslink, reader: jspb.BinaryReader): Crosslink;
}

export namespace Crosslink {
  export type AsObject = {
    epoch: number,
    crosslinkDataRootHash32: Uint8Array | string,
  }
}

export class Deposit extends jspb.Message {
  getMerkleProofHash32sList(): Array<Uint8Array | string>;
  setMerkleProofHash32sList(value: Array<Uint8Array | string>): void;
  clearMerkleProofHash32sList(): void;
  addMerkleProofHash32s(value: Uint8Array | string, index?: number): void;

  getMerkleTreeIndex(): number;
  setMerkleTreeIndex(value: number): void;

  getDepositData(): Uint8Array | string;
  getDepositData_asU8(): Uint8Array;
  getDepositData_asB64(): string;
  setDepositData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Deposit.AsObject;
  static toObject(includeInstance: boolean, msg: Deposit): Deposit.AsObject;
  static serializeBinaryToWriter(message: Deposit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Deposit;
  static deserializeBinaryFromReader(message: Deposit, reader: jspb.BinaryReader): Deposit;
}

export namespace Deposit {
  export type AsObject = {
    merkleProofHash32sList: Array<Uint8Array | string>,
    merkleTreeIndex: number,
    depositData: Uint8Array | string,
  }
}

export class VoluntaryExit extends jspb.Message {
  getEpoch(): number;
  setEpoch(value: number): void;

  getValidatorIndex(): number;
  setValidatorIndex(value: number): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VoluntaryExit.AsObject;
  static toObject(includeInstance: boolean, msg: VoluntaryExit): VoluntaryExit.AsObject;
  static serializeBinaryToWriter(message: VoluntaryExit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VoluntaryExit;
  static deserializeBinaryFromReader(message: VoluntaryExit, reader: jspb.BinaryReader): VoluntaryExit;
}

export namespace VoluntaryExit {
  export type AsObject = {
    epoch: number,
    validatorIndex: number,
    signature: Uint8Array | string,
  }
}

export class Eth1Data extends jspb.Message {
  getDepositRootHash32(): Uint8Array | string;
  getDepositRootHash32_asU8(): Uint8Array;
  getDepositRootHash32_asB64(): string;
  setDepositRootHash32(value: Uint8Array | string): void;

  getBlockHash32(): Uint8Array | string;
  getBlockHash32_asU8(): Uint8Array;
  getBlockHash32_asB64(): string;
  setBlockHash32(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Eth1Data.AsObject;
  static toObject(includeInstance: boolean, msg: Eth1Data): Eth1Data.AsObject;
  static serializeBinaryToWriter(message: Eth1Data, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Eth1Data;
  static deserializeBinaryFromReader(message: Eth1Data, reader: jspb.BinaryReader): Eth1Data;
}

export namespace Eth1Data {
  export type AsObject = {
    depositRootHash32: Uint8Array | string,
    blockHash32: Uint8Array | string,
  }
}

export class Eth1DataVote extends jspb.Message {
  getEth1Data(): Eth1Data | undefined;
  setEth1Data(value?: Eth1Data): void;
  hasEth1Data(): boolean;
  clearEth1Data(): void;

  getVoteCount(): number;
  setVoteCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Eth1DataVote.AsObject;
  static toObject(includeInstance: boolean, msg: Eth1DataVote): Eth1DataVote.AsObject;
  static serializeBinaryToWriter(message: Eth1DataVote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Eth1DataVote;
  static deserializeBinaryFromReader(message: Eth1DataVote, reader: jspb.BinaryReader): Eth1DataVote;
}

export namespace Eth1DataVote {
  export type AsObject = {
    eth1Data?: Eth1Data.AsObject,
    voteCount: number,
  }
}

