import { Context, Mongo } from '..';
import * as env from '../config/env';
import { proccessTransactions } from '../jobs/transactions';

global['mongo'] = global['mongo'] || new Mongo(env);

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await global['mongo'].connect();

  const ctx = new Context(env, global['mongo']);
  
  return new Promise((resolve, reject) => {
    return proccessTransactions(ctx, resolve, reject);
  });
};
