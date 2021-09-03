import { Db, MongoClient } from 'mongodb';
import { Migrator, Seeder } from 'mongodb-builder';
import * as path from 'path';
import { Env } from '../config/env';

/**
 * Mongodb class.
 */
export class Mongo {
  public env: Env;
  public db: Db;
  public client: MongoClient;

  /**
   * Class constructor.
   * @param env Environment variables.
   */
  public constructor(env: Env) {
    this.env = env;
  }

  /**
   * Starts database client.
   */
  public async connect() {

    if (!this.client || !this.client.isConnected()) {
      this.client = await MongoClient.connect(this.env.mongoUrl, {
        poolSize: this.env.mongoPool,
        useNewUrlParser: true,
      });
      this.db = this.client.db(this.env.mongoDb);
    }
    return this;
  }

  /**
   * Closes database client.
   */
  public async close() {
    if (this.client) {
      await this.client.close();
    }

    return this;
  }

  /**
   * Removes all data in the database.
   */
  public async cleenup() {
    const collections = await this.db
      .listCollections({})
      .toArray();

    await Promise.all(
      collections
        .filter((collection) => collection.name !== 'system.indexes')
        .map((collection) => this.db.collection(collection.name).deleteMany({})),
    );

    return this;
  }

  /**
   * Runs migrations which upgrades the stage.
   * @param events Number of events to perform.
   */
  public async upgrade(events?: number) {
    const migrator = new Migrator({
      collection: this.db.collection('migrations'),
      context: this,
    });
    await migrator.addDir(path.join(process.cwd(), 'src', 'migrations'));
    await migrator.upgrade(events);
  }

  /**
   * Runs migrations which downgrade the stage.
   * @param events Number of events to perform.
   */
  public async downgrade(events?: number) {
    const migrator = new Migrator({
      collection: this.db.collection('migrations'),
      context: this,
    });
    await migrator.addDir(path.join(process.cwd(), 'src', 'migrations'));
    await migrator.downgrade(events);
  }

  /**
   * Seeds the stage with fake data.
   */
  public async seed() {
    const seeder = new Seeder({
      context: this,
    });
    await seeder.addDir(path.join(process.cwd(), 'src', 'seeds'));
    await seeder.perform();
  }

}
