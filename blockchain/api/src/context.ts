import { ObjectId } from 'mongodb';
import { Env } from './config/env';
import { Mongo } from './lib/mongo';

/**
 * Request object context holds personalized request-based information.
 */
export class Context {
  public id: ObjectId;
  public env: Env;
  public mongo: Mongo;
  public profile: {id: string};

  /**
   * Class constructor.
   * @param stage Already connected stage instance.
   */
  public constructor(env: Env, mongo: Mongo) {
    this.id = new ObjectId();
    this.env = env;
    this.mongo = mongo;
  }
}
