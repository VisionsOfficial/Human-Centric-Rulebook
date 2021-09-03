import { ErrorCode } from './types';

export default {
  // Middleware
  [ErrorCode.UNHANDLED_SYSTEM_ERROR]: 'Unhandled system error.',
  [ErrorCode.INVALID_PATH]: 'Invalid path.',
  [ErrorCode.UNAUTHENTICATED_ACCESS]: 'Unauthenticated access.',
  // Models
  [ErrorCode.INVALID_SIGNATURE]: 'Invalid signature.',
  [ErrorCode.INVALID_CONTRACT]: 'Invalid contract id.',
  [ErrorCode.HASH_NOT_MATCHING]: 'Message hash not matching existing contract.',
};
