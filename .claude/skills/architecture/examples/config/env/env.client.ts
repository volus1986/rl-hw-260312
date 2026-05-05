import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env client
export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_<NAME>: z.string().nonempty({ message: 'NEXT_PUBLIC_<NAME> is required' }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_<NAME>: process.env.NEXT_PUBLIC_<NAME>,
  },
})
