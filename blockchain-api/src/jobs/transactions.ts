import { Account } from 'web3x/account';
import { Address } from 'web3x/address';
import { ContractStatus } from '../config/types';
import { Context } from '../context';
import { DapsiNFT } from '../contracts/DapsiNFT';
import { createEthConnector } from '../lib/blockchain';
import { Contract } from '../models/contract';
import { sha3 } from 'web3x/utils';

export async function proccessTransactions(context: Context, successCb: any, failureCb: any) {

  const toProcess = await context.mongo.db.collection('contracts').find({
    status: ContractStatus.WAIT,
    clientSignature: { $ne: null },
    providerSignature: { $ne: null }
  }).sort({ updatedAt: -1 }).toArray().then((docs) => {
    return docs.map((d) => new Contract(d, { context }));
  });

  let length = toProcess.length;
  console.log('To process: ', length);

  // Only process 50 at a time.
  if (toProcess.length > 50) {
    // Maybe send an warning email that we have more then 50 transaction waiting? Potential error?
    length = 50;
  }

  const eth = createEthConnector(context);
  for (let i = 0; i < length; i++) {
    const contract = toProcess[i];
    const nonce = await context.mongo.db.collection('metadata').findOneAndUpdate(
      { name: 'wallet-address-nonce' },
      { $inc: { value: 1 } }
    ).then((doc) => {
      return doc.value;
    });

    const account = Account.fromPrivate(Buffer.from(context.env.privateKey, 'hex'));
    const contractAddress = Address.fromString(context.env.contractAddress);
    const token = new DapsiNFT(eth, contractAddress);
    const txSend = token.methods.create(account.address, contract.contractId, contract.hash);

    const txParams = {
      from: account.address,
      nonce: nonce.value,
      to: contractAddress,
      value: 0,
      data: txSend.encodeABI(),
      gas: '250000',
      gasPrice: '1000000000', // 1 Gwei
      chainId: '4' // rinkeby
    };

    const rawTx = await account.signTransaction(txParams, eth);

    contract.populate({
      rawTransaction: rawTx.rawTransaction,
      txHash: sha3(rawTx.rawTransaction),
      nonce: nonce.value,
      status: ContractStatus.PROCESS,
    });
    await contract.upsert();

    const sendTx = eth.sendSignedTransaction(rawTx.rawTransaction);
    console.log('Tx:', await sendTx.getTxHash());

    contract.populate({
      status: ContractStatus.COMPLETE,
    });
    await contract.upsert();
  }
  successCb();
}