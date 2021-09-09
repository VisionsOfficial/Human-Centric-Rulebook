import { HttpServer, Mongo } from '..';
import * as env from '../config/env';

const mongo = new Mongo(env);
const api = new HttpServer(env, mongo);

(async () => {
  await mongo.connect();
  await api.listen();
})().catch(async (err) => {
  console.log(err);
  await api.close();
  await mongo.close();
});
