'use client';
import { type ReactNode } from 'react';
import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface IProps {
  children: ReactNode;
}

const TanstackQueryClientProvider = (props: Readonly<IProps>) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

export default TanstackQueryClientProvider;
