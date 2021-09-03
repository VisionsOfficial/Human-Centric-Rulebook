import { Application } from 'express';
import { ContractStatus, ErrorCode, SerializedStrategy, VerificationStatus } from '../config/types';
import { NextFunction, Request, Response } from '../http';
import { ResourceError } from '../lib/errors';
import { Contract } from '../models/contract';

/**
 * Installs new route on the provided application.
 * @param app ExpressJS application.
 */
export function inject(app: Application) {
  app.get('/contracts/:id/verify', (req: Request, res: Response, next: NextFunction) => {
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
 
  const contract = await new Contract({}, { context }).populateByContractId(params.id);

  if (!contract.isPersistent()) {
    throw new ResourceError(ErrorCode.INVALID_CONTRACT);
  }

  let verificationStatus = null;

  if (contract.status === ContractStatus.WAIT) {
    if (contract.clientSignature) {
      verificationStatus = VerificationStatus.SIGNED_BY_CLIENT
    }

    if (contract.providerSignature) {
      verificationStatus = VerificationStatus.SIGNED_BY_PROVIDER
    }

    if (contract.providerSignature && contract.clientSignature) {
      verificationStatus = VerificationStatus.SENDING_TO_BLOCKCHAIN;
    }

  } else if (contract.status === ContractStatus.PROCESS) {
    verificationStatus = VerificationStatus.SENDING_TO_BLOCKCHAIN;
  } else if (contract.status === ContractStatus.COMPLETE) {
    verificationStatus = VerificationStatus.CONFIRMED;
  } else if (contract.status === ContractStatus.REVOKE) {
    verificationStatus = VerificationStatus.REVOKED;
  }

  return res.respond(200, { ...contract.serialize(SerializedStrategy.PUBLIC), verificationStatus });
}
