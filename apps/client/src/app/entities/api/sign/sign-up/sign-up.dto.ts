import { z } from 'zod';

//constant
export const SSignUpRes = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

// interface
export type TSignUpRes = z.infer<typeof SSignUpRes>;
