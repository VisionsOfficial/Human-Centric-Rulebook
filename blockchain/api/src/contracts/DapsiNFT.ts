import BN from "bn.js";
import { Address } from "web3x/address";
import { EventLog, TransactionReceipt } from "web3x/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x/contract";
import { Eth } from "web3x/eth";
import abi from "./DapsiNFTAbi";
export type ApprovalEvent = {
    _owner: Address;
    _approved: Address;
    _tokenId: string;
};
export type ApprovalForAllEvent = {
    _owner: Address;
    _operator: Address;
    _approved: boolean;
};
export type OwnershipTransferredEvent = {
    previousOwner: Address;
    newOwner: Address;
};
export type TransferEvent = {
    _from: Address;
    _to: Address;
    _tokenId: string;
};
export interface ApprovalEventLog extends EventLog<ApprovalEvent, "Approval"> {
}
export interface ApprovalForAllEventLog extends EventLog<ApprovalForAllEvent, "ApprovalForAll"> {
}
export interface OwnershipTransferredEventLog extends EventLog<OwnershipTransferredEvent, "OwnershipTransferred"> {
}
export interface TransferEventLog extends EventLog<TransferEvent, "Transfer"> {
}
interface DapsiNFTEvents {
    Approval: EventSubscriptionFactory<ApprovalEventLog>;
    ApprovalForAll: EventSubscriptionFactory<ApprovalForAllEventLog>;
    OwnershipTransferred: EventSubscriptionFactory<OwnershipTransferredEventLog>;
    Transfer: EventSubscriptionFactory<TransferEventLog>;
}
interface DapsiNFTEventLogs {
    Approval: ApprovalEventLog;
    ApprovalForAll: ApprovalForAllEventLog;
    OwnershipTransferred: OwnershipTransferredEventLog;
    Transfer: TransferEventLog;
}
interface DapsiNFTTxEventLogs {
    Approval: ApprovalEventLog[];
    ApprovalForAll: ApprovalForAllEventLog[];
    OwnershipTransferred: OwnershipTransferredEventLog[];
    Transfer: TransferEventLog[];
}
export interface DapsiNFTTransactionReceipt extends TransactionReceipt<DapsiNFTTxEventLogs> {
}
interface DapsiNFTMethods {
    approve(_approved: Address, _tokenId: number | string | BN): TxSend<DapsiNFTTransactionReceipt>;
    authorizedAddresses(a0: Address): TxCall<boolean>;
    balanceOf(_owner: Address): TxCall<string>;
    create(_to: Address, _tokenId: number | string | BN, _hash: string): TxSend<DapsiNFTTransactionReceipt>;
    getApproved(_tokenId: number | string | BN): TxCall<Address>;
    idToHash(a0: number | string | BN): TxCall<string>;
    isApprovedForAll(_owner: Address, _operator: Address): TxCall<boolean>;
    name(): TxCall<string>;
    owner(): TxCall<Address>;
    ownerOf(_tokenId: number | string | BN): TxCall<Address>;
    renounceOwnership(): TxSend<DapsiNFTTransactionReceipt>;
    revoke(_tokenId: number | string | BN): TxSend<DapsiNFTTransactionReceipt>;
    safeTransferFrom(_from: Address, _to: Address, _tokenId: number | string | BN): TxSend<DapsiNFTTransactionReceipt>;
    safeTransferFrom(_from: Address, _to: Address, _tokenId: number | string | BN, _data: string): TxSend<DapsiNFTTransactionReceipt>;
    setApprovalForAll(_operator: Address, _approved: boolean): TxSend<DapsiNFTTransactionReceipt>;
    setAuthorizedAddress(addr: Address, isAuthorized: boolean): TxSend<DapsiNFTTransactionReceipt>;
    setUri(_uriPrefix: string, _uriPostfix: string): TxSend<DapsiNFTTransactionReceipt>;
    supportsInterface(_interfaceID: string): TxCall<boolean>;
    symbol(): TxCall<string>;
    tokenByIndex(_index: number | string | BN): TxCall<string>;
    tokenOfOwnerByIndex(_owner: Address, _index: number | string | BN): TxCall<string>;
    tokenURI(_tokenId: number | string | BN): TxCall<string>;
    totalSupply(): TxCall<string>;
    transferFrom(_from: Address, _to: Address, _tokenId: number | string | BN): TxSend<DapsiNFTTransactionReceipt>;
    transferOwnership(newOwner: Address): TxSend<DapsiNFTTransactionReceipt>;
    uriPostfix(): TxCall<string>;
    uriPrefix(): TxCall<string>;
}
export interface DapsiNFTDefinition {
    methods: DapsiNFTMethods;
    events: DapsiNFTEvents;
    eventLogs: DapsiNFTEventLogs;
}
export class DapsiNFT extends Contract<DapsiNFTDefinition> {
    constructor(eth: Eth, address?: Address, options?: ContractOptions) {
        super(eth, abi, address, options);
    }
}
export var DapsiNFTAbi = abi;
