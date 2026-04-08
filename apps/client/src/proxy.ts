import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { mergeCookies } from '@/app/shared/utils';
import { updateSession } from '@/pkg/supabase';

import { routing } from './pkg/locale/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const supabaseResponse = await updateSession(request);
  const intlResponse = intlMiddleware(request);

  mergeCookies(supabaseResponse, intlResponse);

  return intlResponse;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
