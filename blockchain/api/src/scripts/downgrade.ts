import * as env from '../config/env';
import { Mongo } from '../lib/mongo';

const mongo = new Mongo(env);
const events = parseInt(process.argv[2] || '-1');
(async () => {
  await mongo.connect();
  await mongo.downgrade(events);
  await mongo.close();
})().catch(async (err) => {
  console.log(err);
  await mongo.close();
});
