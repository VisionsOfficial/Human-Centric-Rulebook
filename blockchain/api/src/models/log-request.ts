import { PopulateStrategy, SerializedStrategy } from '../config/types';
import { bsonObjectIdParser, bsonObjectIdStringParser, dateParser,
  integerParser, stringParser, toObjectId } from '../lib/parsers';
import { ModelBase, ObjectId, prop } from './base';

/**
 * Log model.
 */
export class LogRequest extends ModelBase {
  /**
   * Database ID.
   */
  @prop({
    parser: { resolver: bsonObjectIdParser },
    serializable: [SerializedStrategy.DB],
  })
  public _id: ObjectId;

  /**
   * Virtual ID.
   */
  @prop({
    parser: { resolver: bsonObjectIdStringParser() },
    getter() { return this._id; },
    setter(v) { this._id = v; },
  })
  public id: string;

  /**
   * Request ID.
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB, SerializedStrategy.DB],
    fakeValue: new ObjectId().toString(),
  })
  public requestId: string;

  /**
   * Host name (HTTP remoteIP=127.0.0.1);
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB, SerializedStrategy.DB],
    fakeValue: 'localhost',
  })
  public host: string;

  /**
   * IP address.
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: '127.0.0.1',
  })
  public ip: string;

  /**
   * Status (200).
   */
  @prop({
    parser: { resolver: integerParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: 200,
  })
  public status: number;

  /**
   * Method used (GET).
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: 'GET',
  })
  public method: string;

  /**
   * Url (/profile/auth).
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: '/profile/auth',
  })
  public url: string;

  /**
   * User agent (Chrome 54.0.2840 / Mac OS X 10.11.6).
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: 'Chrome 54.0.2840',
  })
  public userAgent: string;

  /**
   * Body data (POST / PUT).
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: 'POST',
  })
  public body: string;

  /**
   * Response time (10ms).
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: '10ms',
  })
  public responseTime: string;

  /**
   * Date of creation.
   */
  @prop({
    parser: { resolver: dateParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: new Date(),
  })
  public createdAt: Date;

  /**
   * Tells if the model represents a document stored in the database.
   */
  public isPersistent() {
    return !!this._id;
  }

  /**
   * Populates model fields by loading the document with the provided references
   * from the database.
   * @param ref Log request reference.
   */
  public async populateByRef(ref: any) {
    ref = toObjectId(ref);
    if (!ref) {
      return this.reset();
    }
    const doc = await this.getContext().mongo.db
      .collection('logs')
      .findOne({ '_id': ref });
    return this.reset().populate(doc).commit();
  }

  /**
   * Creates new model in DB.
   */
  public async create() {
    await this.getContext().mongo.db
      .collection('logs')
      .insertOne(
        this.serialize(SerializedStrategy.DB),
        {
          w: 0,
          j: false,
        },
      ).then((r) => {
        this._id = r.insertedId;
      });
    return this.commit();
  }
}
