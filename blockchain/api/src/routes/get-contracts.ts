import { Application } from 'express';
import {  PopulateStrategy, SerializedStrategy } from '../config/types';
import { NextFunction, Request, Response } from '../http';
import { Contract } from '../models/contract';
import { ContractsCursor } from '../models/contracts-cursor';

/**
 * Installs new route on the provided application.
 * @param app ExpressJS application.
 */
export function inject(app: Application) {
  app.get('/contracts', (req: Request, res: Response, next: NextFunction) => {
    resolve(req, res).catch(next);
  });
}

/**
 * A middleware that responds with server information.
 * @param req ExpressJS request object.
 * @param res ExpressJS response object.
 */
export async function resolve(req: Request, res: Response): Promise<void> {
  const { context, query } = req;

  const cursor = new ContractsCursor({}, { context }).populate(query, PopulateStrategy.PUBLIC);
  const $match = cursor.buildQuery();
  const data = await context.mongo.db
    .collection('contracts')
    .aggregate([
      { $match },
      { $sort: cursor.buildSort() },
      { $skip: cursor.skip },
      { $limit: cursor.limit },
    ])
    .toArray()
    .then((docs) => {
      return docs.map((d) => new Contract(d, { context }).serialize(SerializedStrategy.PUBLIC));
    });

  const totalCount = await context.mongo.db
    .collection('contracts')
    .countDocuments($match);

  return res.respond(200, data, {
    totalCount,
    skip: cursor.skip,
    limit: cursor.limit,
  });
}
