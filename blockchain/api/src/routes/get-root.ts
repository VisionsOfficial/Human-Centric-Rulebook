import { Application } from 'express';
import { NextFunction, Request, Response } from '../http';

/**
 * Installs new route on the provided application.
 * @param app ExpressJS application.
 */
export function inject(app: Application) {
  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    resolve(req, res).catch(next);
  });
}

/**
 * A middleware that responds with server information.
 * @param req ExpressJS request object.
 * @param res ExpressJS response object.
 */
export async function resolve(req: Request, res: Response): Promise<void> {
  return res.respond(200, {
    'name': `DAPSI Gateway`,
    'description': 'Authentication service',
    'uptime': process.uptime(),
    'version': process.env.npm_package_version,
  });
}
