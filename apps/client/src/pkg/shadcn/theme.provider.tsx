'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

// provider
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // return
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
