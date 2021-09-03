import { Application } from 'express';
import { ContractStatus, ErrorCode, SerializedStrategy } from '../config/types';
import { NextFunction, Request, Response } from '../http';
import { ResourceError, UnauthenticatedError } from '../lib/errors';
import { readRevokeToken } from '../lib/jwt';
import { Contract } from '../models/contract';
import { createEthConnector } from '../lib/blockchain';
import { Account } from 'web3x/account';
import { Address } from 'web3x/address';
import { sha3 } from 'web3x/utils';
import { DapsiNFT } from '../contracts/DapsiNFT';

/**
 * Installs new route on the provided application.
 * @param app ExpressJS application.
 */
export function inject(app: Application) {
  app.post('/contracts/:id/revoke', (req: Request, res: Response, next: NextFunction) => {
    resolve(req, res).catch(next);
  });
}

/**
 * A middleware that responds with server information.
 * @param req ExpressJS request object.
 * @param res ExpressJS response object.
 */
export async function resolve(req: Request, res: Response): Promise<void> {

  const { context, params } = req;
  const token = (req.get('authorization') || '').split(' ').reverse()[0];
  const data = readRevokeToken(token, context);

  if (!data || !data.id) {
    throw new UnauthenticatedError(ErrorCode.UNAUTHENTICATED_ACCESS);
  }

  if (params.id !== data.id) {
    throw new ResourceError(ErrorCode.INVALID_CONTRACT);
  }

  const contract = await new Contract({}, { context }).populateByContractId(data.id);

  if (!contract.isPersistent() && contract.status == ContractStatus.COMPLETE) {
    throw new ResourceError(ErrorCode.INVALID_CONTRACT);
  }
  
  const eth = createEthConnector(context);
  const nonce = await context.mongo.db.collection('metadata').findOneAndUpdate(
    { name: 'wallet-address-nonce' },
    { $inc: { value: 1 } }
  ).then((doc) => {
    return doc.value;
  });

  const account = Account.fromPrivate(Buffer.from(context.env.privateKey, 'hex'));
  const contractAddress = Address.fromString(context.env.contractAddress);
  const nft = new DapsiNFT(eth, contractAddress);
  const txSend = nft.methods.revoke(contract.contractId);

  const txParams = {
    from: account.address,
    nonce: nonce.value,
    to: contractAddress,
    value: 0,
    data: txSend.encodeABI(),
    gas: '150000',
    gasPrice: '1000000000', // 1 Gwei
    chainId: '4' // rinkeby
  };

  const rawTx = await account.signTransaction(txParams, eth);

  contract.populate({
    status: ContractStatus.REVOKE,
    revokeRawTransaction: rawTx.rawTransaction,
    revokeTxHash: sha3(rawTx.rawTransaction),
    revokeNonce: nonce.value,
  });
  await contract.upsert();

  const sendTx = eth.sendSignedTransaction(rawTx.rawTransaction);
  console.log('Tx:', await sendTx.getTxHash());

  return res.respond(201, contract.serialize(SerializedStrategy.PUBLIC));

}
