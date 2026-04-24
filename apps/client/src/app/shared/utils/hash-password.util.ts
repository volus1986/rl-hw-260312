import { createHash } from 'crypto';

import { envServer } from '@/config/env';

import 'server-only';

//function
export function hashPassword(password: string): string {
  //return
  return createHash('sha256')
    .update(password + envServer.PASSWORD_SALT)
    .digest('hex');
}
