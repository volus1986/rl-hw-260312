import { z } from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

// env server
export const envServer = createEnv({
  server: {
    // NODE_ENV: z.enum(['development', 'production']).optional().default('development'),
    JWT_SECRET: z.string().min(1, { message: 'JWT_SECRET is required' }),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, { message: 'SUPABASE_SERVICE_ROLE_KEY is required' }),
    PASSWORD_SALT: z.string().min(1, { message: 'PASSWORD_SALT is required' }),
    AUTH_COOKIE: z.string().min(1, { message: 'AUTH_COOKIE is required' }),
    TOKEN_MAX_AGE: z.coerce.number().int().positive({ message: 'TOKEN_MAX_AGE is required' }),
    // REDIS_URL: z.string().optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    // NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    PASSWORD_SALT: process.env.PASSWORD_SALT,
    AUTH_COOKIE: process.env.AUTH_COOKIE,
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    // REDIS_URL: process.env.REDIS_URL,
  },
});
