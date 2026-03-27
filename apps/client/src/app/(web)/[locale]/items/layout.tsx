import { type FC, type ReactNode } from 'react';

import { TanstackQueryClientProvider } from '@/pkg/providers';

interface IProps {
  children: ReactNode;
}

const ItemsLayout: FC<Readonly<IProps>> = (props) => {
  return <TanstackQueryClientProvider>{props.children}</TanstackQueryClientProvider>;
};

export default ItemsLayout;
