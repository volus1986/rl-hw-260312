import { z } from 'zod';

export const SLoginReq = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const SLoginRes = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  }),
});

export type TLoginReq = z.infer<typeof SLoginReq>;
export type TLoginRes = z.infer<typeof SLoginRes>;
