import { Mongo } from '..';
import * as env from '../config/env';

const mongo = new Mongo(env);
const events = parseInt(process.argv[2] || '-1');

(async () => {
  await mongo.connect();
  await mongo.upgrade(events);
  await mongo.close();
})().catch(async (err) => {
  console.log(err);
  await mongo.close();
});
