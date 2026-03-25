import { type ReactNode } from 'react';

import Providers from '@/app/providers';

interface IProps {
  children: ReactNode;
}

const ItemsLayout = ({ children }: IProps) => {
  return <Providers>{children}</Providers>;
};

export default ItemsLayout;
