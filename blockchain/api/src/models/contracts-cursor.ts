import { PopulateStrategy, } from '../config/types';
import { integerParser, stringParser } from '../lib/parsers';
import { ModelBase, prop } from './base';

/**
 * A cursor model for constructing conditions for listing contracts.
 */
export class ContractsCursor extends ModelBase {
  /**
   * Defines the `skip` field.
   */
  @prop({
    parser: { resolver: integerParser() },
    populatable: [PopulateStrategy.PUBLIC],
    setter(v) {
      return v < 0 ? 0 : v;
    },
    defaultValue: 0,
  })
  public skip: number;

  /**
   * Defines the `limit` field.
   */
  @prop({
    parser: { resolver: integerParser() },
    populatable: [PopulateStrategy.PUBLIC],
    setter(v) {
      let env = this.getContext().env;
      if (v < 1) { v = env.pageDefaultLimit; }
      if (v > env.pageMaxLimit ) { v = env.pageMaxLimit; }
      return v;
    },
    defaultValue() {
      return this.getContext().env.pageDefaultLimit;
    },
  })
  public limit: number;

 
  /**
   * Returns MongoDB condition for querying deployments.
   */
  public buildQuery() {
    const conditions = [];

    if (conditions.length) {
      return { $and: conditions };
    } else {
      return {};
    }
  }

  /**
   * Returns MongoDB condition for sorting approvals.
   */
  public buildSort() {
    const data = {};

    data['createdAt'] = -1;

    return data;
  }
}
