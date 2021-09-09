import { HttpServer, Mongo } from '..';
import * as env from '../config/env';

const mongo = new Mongo(env);
const api = new HttpServer(env, mongo);
const routes = api.collectRoutes();

console.log(
  JSON.stringify(routes, null, 2),
);
