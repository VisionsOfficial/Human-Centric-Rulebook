import { HttpServer, Mongo } from '..';
import * as env from '../config/env';
import * as ase from 'aws-serverless-express';

global['mongo'] = global['mongo'] || new Mongo(env);
const api = new HttpServer(env, global['mongo']);
const server = ase.createServer(api.app, null);

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await global['mongo'].connect();

  return new Promise((resolve, _reject) => {
    ase.proxy(server, event, {
      ...context,
      succeed: resolve
    });
  });
};
