import { z } from 'zod';

export const SRegisterReq = z.object({
  email: z.email(),
  password: z.string().min(1),
  name: z.string().min(1),
});

export const SRegisterRes = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  }),
});

export type TRegisterReq = z.infer<typeof SRegisterReq>;
export type TRegisterRes = z.infer<typeof SRegisterRes>;
