import { z } from 'zod';

//constant
export const SSignInRes = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

//interface
export type TSignInRes = z.infer<typeof SSignInRes>;
