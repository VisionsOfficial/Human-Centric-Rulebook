import { Application, RequestHandler } from 'express';
import { Env } from '../config/env';
import { Context } from '../context';
import { NextFunction, Request, Response } from '../http';
import { Mongo } from '../lib/mongo';

/**
 * Applies context middleware to application.
 * @param app ExpressJS application.
 * @param env Environment instance.
 * @param mongo MongoDb instance.
 */
export function inject(app: Application, env: Env, mongo: Mongo): void {
  app.use(createContext(env, mongo));
}

/**
 * Returns a middleware which creates a new context object for each request and
 * saves it to the request object.
 * @param env ENV variables.
 * @param mongo MongoDb instance.
 * @param provider Blockchain provider instance.
 */
export function createContext(env: Env, mongo: Mongo): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {

    req.context = await new Context(env, mongo);

    next();
  };
}
