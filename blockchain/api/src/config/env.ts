import * as dotenv from 'dotenv';

/**
 * Environment object interface.
 */
export interface Env {
  appEnv: string;
  appSecret: string;
  httpHost: string;
  httpPort: number;
  mongoUrl: string;
  mongoDb: string;
  mongoPool: number;
  pageDefaultLimit: number;
  pageMaxLimit: number;
  ethAccessKeyId: string;
  ethSecretAccessKey: string;
  ethRPC: string;
  contractAddress: string;
  privateKey: string;
}

/**
 * Load variables from .env.
 */
dotenv.config();

/**
 * Application environment.
 */
export const appEnv = process.env['APP_ENV'];

/**
 * Application secret.
 */
export const appSecret = process.env['APP_SECRET'];

/**
 * HTTP server hostname.
 */
export const httpHost = process.env['API_HOST'];

/**
 * HTTP server port.
 */
export const httpPort = parseInt(process.env['API_PORT']);

/**
 * MongoDB URL.
 */
export const mongoUrl = process.env['MONGO_URL'];

/**
 * MongoDB database name.
 */
export const mongoDb = process.env['MONGO_DB'];

/**
 * MongoDB connection pool size.
 */
export const mongoPool = parseInt(process.env['MONGO_POOL']);

/**
 * Pagination default size limit.
 */
export const pageDefaultLimit = parseInt(process.env['PAGE_DEFAULT_LIMIT']);

/**
 * Pagination maximum size limit.
 */
export const pageMaxLimit = parseInt(process.env['PAGE_MAX_LIMIT']);

/*
 * Ethereum contract address which will be parsed.
 */
export const contractAddress = process.env['CONTRACT_ADDRESS'];

/*
 * Ethereum RPC user's ACCESS_KEY_ID.
 */
export const ethAccessKeyId = process.env['ETH_ACCESS_KEY_ID'];

/*
 * Ethereum RPC user's
 */
export const ethSecretAccessKey = process.env['ETH_SECRET_ACCESS_KEY'];

/*
 * Ethereum RPC url 
 */
export const ethRPC = process.env['ETH_RPC'];

/**
 * Private key.
 */
 export const privateKey = process.env['PRIVATE_KEY'];
