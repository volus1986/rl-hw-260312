import { z } from 'zod';

// user info response schema
export const SUserRes = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

export type TUserRes = z.infer<typeof SUserRes>;
