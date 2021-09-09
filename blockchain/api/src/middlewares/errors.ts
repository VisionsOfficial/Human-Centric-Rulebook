import { Application } from 'express';
import messages from '../config/messages';
import { ErrorCode } from '../config/types';
import { NextFunction, Request, Response } from '../http';
import { ResourceError, UnauthenticatedError, UnauthorizedError, ValidationError } from '../lib/errors';

/**
 * Applies error-related routes to application.
 * @param app ExpressJS application.
 */
export function inject(app: Application) {
  app.use(handleNotFound);
  app.use(handleError);
}

/**
 * A middleware which handles 404.
 * @param req ExpressJS request object.
 * @param res ExpressJS response object.
 */
export function handleNotFound(req: Request, res: Response): void {
  res.throw(404, {
    code: ErrorCode.INVALID_PATH,
    message: messages[ErrorCode.INVALID_PATH],
  });
}

/**
 * A middleware which handles system errors.
 * @param error Error object.
 * @param req ExpressJS request object.
 * @param res ExpressJS response object.
 * @param next ExpressJS next function.
 */
export function handleError(error: any, req: Request, res: Response, next: NextFunction): void {
  if (
    error instanceof UnauthenticatedError
    || error instanceof UnauthorizedError
    || error instanceof ResourceError
  ) {
    res.throw(error.status, {
      code: error.code,
      message: error.message,
    });
  } else if (
    error instanceof ValidationError
  ) {
    res.throw(error.status, error.model.collectErrors()
      .map((e) => ({
        code: e.code,
        message: messages[e.code],
      })),
    );
  } else {
    res.throw(500, {
      code: error.code || ErrorCode.UNHANDLED_SYSTEM_ERROR, // expose only error code
      message: messages[ErrorCode.UNHANDLED_SYSTEM_ERROR], // don't expose message to users
    });
    console.error('Error:', error);
  }

  next();
}
