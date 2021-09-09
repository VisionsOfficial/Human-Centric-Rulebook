import { Mongo } from '..';
import * as env from '../config/env';

const mongo = new Mongo(env);
(async () => {
  await mongo.connect();
  await mongo.seed();
  await mongo.close();
})().catch(async (err) => {
  console.log(err);
  await mongo.close();
});
