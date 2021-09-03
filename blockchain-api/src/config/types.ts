/**
 * Error code.
 */
export enum ErrorCode {
  UNHANDLED_SYSTEM_ERROR = 500000,
  UNAUTHENTICATED_ACCESS = 400001,
  INVALID_PATH = 400004,
  INVALID_SIGNATURE = 400005,
  INVALID_CONTRACT = 400006,
  HASH_NOT_MATCHING = 400007,
}
  
/**
 * Serialized strategy.
 */
export enum SerializedStrategy {
  DB = 'db',
  PUBLIC = 'public', // public output
}

/**
 * Populate strategy.
 */
export enum PopulateStrategy {
  DB = 'db',
  PUBLIC = 'public', // public input
}

export enum ContractStatus {
  WAIT = 1,
  PROCESS = 2,
  COMPLETE = 3,
  REVOKE = 4
}

export enum VerificationStatus {
  SIGNED_BY_CLIENT = 1,
  SIGNED_BY_PROVIDER = 2,
  SENDING_TO_BLOCKCHAIN = 3,
  CONFIRMED = 4,
  REVOKED = 5
}