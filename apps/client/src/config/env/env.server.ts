import { z } from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

// env server
export const envServer = createEnv({
  server: {
    // NODE_ENV: z.enum(['development', 'production']).optional().default('development'),
    JWT_SECRET: z.string().min(1, { message: 'JWT_SECRET is required' }),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, { message: 'SUPABASE_SERVICE_ROLE_KEY is required' }),
    // REDIS_URL: z.string().optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    // NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    // REDIS_URL: process.env.REDIS_URL,
  },
});
