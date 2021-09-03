import { HttpServer } from '../..';
import * as env from '../../config/env';

/**
 * Starts HTTP server.
 */
export async function startHttpServer(stage) {
  const { mongo } = stage.get('context')
  const server = await new HttpServer({ ...env, httpPort: 4445 }, mongo).listen();
  stage.set('server', server);
}

/**
 * Stops HTTP server.
 */
export async function stopHttpServer(stage) {
  await stage.get('server').close();
}
