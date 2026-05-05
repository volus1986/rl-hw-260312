import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env server
export const envServer = createEnv({
  server: {
    <SECRET_NAME>: z.string().min(1, { message: '<SECRET_NAME> is required' }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    <SECRET_NAME>: process.env.<SECRET_NAME>,
  },
})
