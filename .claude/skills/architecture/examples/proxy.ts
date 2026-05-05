import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { mergeCookies } from '@/app/shared/utils'
import { updateSession } from '@/pkg/supabase'

import { routing } from './pkg/locale/routing'

const intlMiddleware = createIntlMiddleware(routing)

// middleware entry
export async function proxy(request: NextRequest) {
  const supabaseResponse = await updateSession(request)
  const intlResponse = intlMiddleware(request)

  // merge cookies from both responses
  mergeCookies(supabaseResponse, intlResponse)

  // return
  return intlResponse
}

// matcher config
export const config = {
  matcher: [
    '/((?!_next|_next/static|_next/image|_vercel|static|.well-known|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
