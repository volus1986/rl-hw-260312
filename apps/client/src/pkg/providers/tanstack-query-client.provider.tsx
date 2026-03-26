'use client';
import { type ReactNode } from 'react';
import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface IProps {
  children: ReactNode;
}

const TanstackQueryClientProvider = ({ children }: IProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanstackQueryClientProvider;
