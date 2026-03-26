import { type ReactNode } from 'react';

import { TanstackQueryClientProvider } from '@/pkg/providers';

interface IProps {
  children: ReactNode;
}

const ItemsLayout = ({ children }: IProps) => {
  return <TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>;
};

export default ItemsLayout;
