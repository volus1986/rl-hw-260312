import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { envServer } from '@/config/env';

import 'server-only';

// function
function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export async function createSession(userId: string, email: string): Promise<void> {
  const token = await new SignJWT({ sub: userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getJwtSecret());

  const cookieStore = await cookies();

  cookieStore.set(envServer.AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: envServer.TOKEN_MAX_AGE,
  });
}
