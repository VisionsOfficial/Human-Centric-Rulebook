import { Application, RequestHandler } from 'express';
import { PopulateStrategy } from '../config/types';
import { NextFunction, Request, Response } from '../http';
import { LogRequest } from '../models/log-request';

/**
 * Applies context middleware to application.
 * @param app ExpressJS application.
 */
export function inject(app: Application): void {
  app.use(logRequests());
}

/**
 * Returns a middleware which creates a new request log for each request and saves it to the database.
 */
export function logRequests(): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {

    const { body } = req;

    const startTime = Date.now();
    const end = res.end;
    const context = req.context;
    res.end = async function() {
      try {
        const args = Array.prototype.slice.apply(arguments);
        end.apply(res, args);
        const bodyMap = mapBody(body);
        const request = new LogRequest({}, { context });
        request.populate({
          requestId: context.id || '',
          host: req.host || '',
          ip: req.ip,
          status: res.statusCode || 0,
          method: req.method || 'NONE',
          url: req.originalUrl || '',
          userAgent: (req.headers && req.headers['user-agent']) ? req.headers['user-agent'] : '',
          body: JSON.stringify(bodyMap || []),
          responseTime: `${Date.now() - startTime}ms`,
          createdAt: new Date(),
        },
        PopulateStrategy.DB);
        await request.create();
      } catch (error) {
        console.log('error:', error);
      }
    };

    next();
  };
}

/**
 * Returns a mapped body object without password field included.
 * @param obj Multer files object from req.
 */
function mapBody(obj) {
  const body = {};
  if (obj) {
    const excludes = ['password'];
    Object.keys(obj).forEach((key) => {
      if (excludes.indexOf(key) === -1) {
        body[key] = obj[key];
      }
    });
  }
  return body;
}
