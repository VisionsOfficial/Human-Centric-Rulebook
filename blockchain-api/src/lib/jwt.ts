import jwt from 'jsonwebtoken';
import { Context } from '../context';

/**
 * Generates a new authentication token.
 * @param profileId Profile id.
 * @param ctx Request context.
 */
export function generateAuthToken(address: string, id: string, ctx: Context) {
  if (!address || !id) {
    return null;
  }
  return jwt.sign({ address, id }, ctx.env.appSecret, {
    subject: 'auth',
  });
}

/**
 * Generates a new revoke token.
 * @param id Contract id.
 * @param ctx Request context.
 */
 export function generateRevokeToken(id: string, ctx: Context) {
  if (!id) {
    return null;
  }
  return jwt.sign({ id }, ctx.env.appSecret, {
    subject: 'revoke',
  });
}

/**
 * Returns authentication token data.
 * @param token Authentication token.
 * @param ctx Request context.
 */
export function readAuthToken(token: string, ctx: Context) {
  try {
    const { address, id } = jwt.verify(token, ctx.env.appSecret, {
      subject: 'auth',
    }) as any;
    if (address && id) {
      return { address, id };
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

/**
 * Returns revoke token data.
 * @param token Revoke token.
 * @param ctx Request context.
 */
 export function readRevokeToken(token: string, ctx: Context) {
  try {
    const { id } = jwt.verify(token, ctx.env.appSecret, {
      subject: 'revoke',
    }) as any;
    if (id) {
      return { id };
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
