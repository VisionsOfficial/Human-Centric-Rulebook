import { Application } from 'express';
import { ContractStatus, ErrorCode, SerializedStrategy } from '../config/types';
import { NextFunction, Request, Response } from '../http';
import { ResourceError, UnauthenticatedError } from '../lib/errors';
import { readAuthToken } from '../lib/jwt';
import * as ethers from 'ethers';
import { Contract } from '../models/contract';

/**
 * Installs new route on the provided application.
 * @param app ExpressJS application.
 */
export function inject(app: Application) {
  app.post('/contracts/:id/sign/client', (req: Request, res: Response, next: NextFunction) => {
    resolve(req, res).catch(next);
  });
}

/**
 * A middleware that responds with server information.
 * @param req ExpressJS request object.
 * @param res ExpressJS response object.
 */
export async function resolve(req: Request, res: Response): Promise<void> {

  const { context, params, body } = req;
  const token = (req.get('authorization') || '').split(' ').reverse()[0];
  const data = readAuthToken(token, context);

  if (!data || !data.id || !data.address) {
    throw new UnauthenticatedError(ErrorCode.UNAUTHENTICATED_ACCESS);
  }

  if (params.id !== data.id) {
    throw new ResourceError(ErrorCode.INVALID_CONTRACT);
  }
  
  try {
    const message = body.hash || '';
    const msgHashBytes = ethers.utils.arrayify(message);
    const pubKey = ethers.utils.recoverPublicKey(msgHashBytes, body.signature);
    const address = ethers.utils.computeAddress(pubKey);
    if (address.toLowerCase() !== data.address.toLowerCase()) {
      throw new Error();
    }
  } catch (e) {
    console.log(e);
    throw new ResourceError(ErrorCode.INVALID_SIGNATURE);
  }

  const contract = await new Contract({}, { context }).populateByContractId(data.id);

  if (contract.isPersistent() && contract.hash !== body.hash) {
    throw new ResourceError(ErrorCode.HASH_NOT_MATCHING);
  }
  
  contract.populate({
    contractId: data.id,
    clientSignature: body.signature,
    hash: body.hash,
    status: ContractStatus.WAIT
  });

  await contract.upsert();

  return res.respond(201, contract.serialize(SerializedStrategy.PUBLIC));

}
