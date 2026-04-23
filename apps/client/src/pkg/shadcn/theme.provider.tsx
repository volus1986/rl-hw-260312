'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

// Suppress the false-positive "Encountered a script tag" warning from next-themes.
// next-themes injects an inline <script> to prevent theme FOUC during SSR,
// which is valid but triggers a React 19 client-side rendering warning.
const PATCHED_KEY = Symbol.for('next-themes-script-warning-suppressed');

if (
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  !(window as unknown as Record<symbol, boolean>)[PATCHED_KEY]
) {
  const originalConsoleError = console.error;

  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }

    originalConsoleError.apply(console, args);
  };

  (window as unknown as Record<symbol, boolean>)[PATCHED_KEY] = true;
}

// provider
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // return
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
