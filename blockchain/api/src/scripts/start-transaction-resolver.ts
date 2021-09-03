import { Context, Mongo } from '..';
import * as env from '../config/env';
import { proccessTransactions } from '../jobs/transactions';

const mongo = new Mongo(env);
const ctx = new Context(env, mongo);

(async () => {
  await mongo.connect();
  await new Promise((resolve, reject) => {
    return proccessTransactions(ctx, resolve, reject);
  });
  await mongo.close();
})().catch(async (err) => {
  console.log(err);
  await mongo.close();
});
