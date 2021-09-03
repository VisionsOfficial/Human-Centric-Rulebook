import { Mongo } from '../lib/mongo';

/**
 * Upgrade logic.
 */
export async function upgrade(ctx: Mongo) {
  await ctx.db.collection('metadata').updateOne({
    "name" : "wallet-address-nonce",
  }, { $set: {
    "name" : "wallet-address-nonce",
    "value" : 0, // initial nonce for a fresh contract
  }}, {
    upsert: true,
  });
}

/**
 * Downgrade logic.
 */
export async function downgrade(ctx: Mongo) {
  await ctx.db.dropDatabase();
}
