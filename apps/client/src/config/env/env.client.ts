import { z } from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

// env client
export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_POSTS_API_URL: z.string().nonempty({ message: 'NEXT_PUBLIC_POSTS_API_URL is required' }),
    // NEXT_PUBLIC_CLIENT_WEB_URL: z.string().nonempty({ message: 'NEXT_PUBLIC_CLIENT_WEB_URL is required' }),
    // NEXT_PUBLIC_CLIENT_API_URL: z.string().nonempty({ message: 'NEXT_PUBLIC_CLIENT_API_URL is required' }),
    NEXT_PUBLIC_SUPABASE_URL: z.url(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string().nonempty(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_POSTS_API_URL: 'https://jsonplaceholder.typicode.com/posts',
    // NEXT_PUBLIC_CLIENT_WEB_URL: process.env.NEXT_PUBLIC_CLIENT_WEB_URL,
    // NEXT_PUBLIC_CLIENT_API_URL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  },
});
