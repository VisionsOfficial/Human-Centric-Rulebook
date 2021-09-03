import * as env from '../config/env';
import { Context } from '..';
import { generateRevokeToken } from '../lib/jwt';

const ctx = new Context(env, null);
const contractId = process.argv[2];
const token = generateRevokeToken(contractId, ctx);

console.log(
  `JWT revoke token with contract ID "${contractId}":\n${token}`,
);
