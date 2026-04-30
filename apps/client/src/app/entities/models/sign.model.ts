import { z } from 'zod';

// constant
export const SSignRes = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

// interface
export type TSignRes = z.infer<typeof SSignRes>;
