import { ContractStatus, PopulateStrategy, SerializedStrategy } from '../config/types';
import { bsonObjectIdParser, bsonObjectIdStringParser, dateParser,
  integerParser, stringParser, toObjectId } from '../lib/parsers';
import { ModelBase, ObjectId, prop } from './base';

/**
 * Contract model.
 */
export class Contract extends ModelBase {
  /**
   * Database ID.
   */
  @prop({
    parser: { resolver: bsonObjectIdParser },
  })
  public _id: ObjectId;

  /**
   * Virtual ID.
   */
  @prop({
    parser: { resolver: bsonObjectIdStringParser() },
    serializable: [SerializedStrategy.PUBLIC],
    getter() { return this._id; },
    setter(v) { this._id = v; },
    fakeValue() { return new ObjectId(); }
  })
  public id: string;

  /**
   * contractId.
   */
   @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB, SerializedStrategy.PUBLIC],
    fakeValue: '1',
  })
  public contractId: string;

  /**
   * Hashed data.
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB, SerializedStrategy.PUBLIC],
    fakeValue: "0x...",
  })
  public hash: string;

  /**
   * clientSignature.
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB, SerializedStrategy.PUBLIC],
    fakeValue: 'clientSignature',
    defaultValue: null
  })
  public clientSignature: string;

  /**
   * providerSignature.
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB, SerializedStrategy.PUBLIC],
    fakeValue: 'providerSignature',
    defaultValue: null
  })
  public providerSignature: string;

  /**
   * txHash.
   */
    @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB, SerializedStrategy.PUBLIC],
    fakeValue: '0x...'
  })
  public txHash: string;

  /**
   * status.
   */
  @prop({
    parser: { resolver: integerParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: ContractStatus.WAIT,
    defaultValue: ContractStatus.WAIT
  })
  public status: ContractStatus;

  /**
   * rawTransaction.
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: '0x...'
  })
  public rawTransaction: string;

  /**
   * Field `nonce`.
   */
   @prop({
    parser: { resolver: integerParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
  })
  public nonce: number;

  /**
   * revokeTxHash.
   */
  @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB, SerializedStrategy.PUBLIC],
    fakeValue: '0x...'
  })
  public revokeTxHash: string;

  /**
   * revokeRawTransaction.
   */
   @prop({
    parser: { resolver: stringParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
    fakeValue: '0x...'
  })
  public revokeRawTransaction: string;

  /**
   * Field `revokeNonce`.
   */
   @prop({
    parser: { resolver: integerParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [SerializedStrategy.DB],
  })
  public revokeNonce: number;

  /**
   * Date of creation.
   */
  @prop({
    parser: { resolver: dateParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [],
    fakeValue: new Date(),
  })
  public createdAt: Date;

  /**
   * Date of creation.
   */
  @prop({
    parser: { resolver: dateParser() },
    populatable: [PopulateStrategy.DB],
    serializable: [],
    fakeValue: new Date(),
  })
  public updatedAt: Date;

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
  public async populateById(id: any) {
    id = toObjectId(id);
    if (!id) {
      return this.reset();
    }
    const doc = await this.getContext().mongo.db
      .collection('contracts')
      .findOne({ '_id': id });
    return this.reset().populate(doc).commit();
  }

  /**
   * Populates model fields by loading the document with the provided references
   * from the database.
   * @param ref Log request reference.
   */
     public async populateByContractId(id: any) {
      if (!id) {
        return this.reset();
      }
      const doc = await this.getContext().mongo.db
        .collection('contracts')
        .findOne({ 'contractId': id });
      return this.reset().populate(doc).commit();
    }

  /**
   * Creates new model in DB.
   */
  public async upsert() {
    await this.getContext().mongo.db
      .collection('contracts')
      .findOneAndUpdate(
        { contractId: this.contractId },
        { 
          $set: {
            ...this.serialize(SerializedStrategy.DB),
            updatedAt: this.updatedAt = new Date(),
          },
          $setOnInsert: {
            createdAt: this.createdAt = new Date(),
          }
        },
        {
          upsert: true,
          returnDocument: 'after'
        },
      ).then((r) => {
        this._id = r.value._id;
      });
    return this.commit();
  }
}
