import * as env from '../config/env';
import { Context } from '..';
import { generateAuthToken } from '../lib/jwt';

const ctx = new Context(env, null);
const address = process.argv[2];
const contractId = process.argv[3];
const token = generateAuthToken(address, contractId, ctx);

console.log(
  `JWT with address "${address} and contract ID "${contractId}":\n${token}`,
);
