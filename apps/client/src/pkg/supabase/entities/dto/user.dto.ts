import { z } from 'zod';

// user info response schema
export const SUserRes = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});
