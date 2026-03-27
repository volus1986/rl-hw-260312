import { type ReactNode } from 'react';

import { TanstackQueryClientProvider } from '@/pkg/providers';

interface IProps {
  children: ReactNode;
}

const ItemsLayout = (props: Readonly<IProps>) => {
  return <TanstackQueryClientProvider>{props.children}</TanstackQueryClientProvider>;
};

export default ItemsLayout;
