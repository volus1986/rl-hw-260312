import Providers from '@/app/providers';
import { type ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const ItemsLayout = ({ children }: IProps) => {
  return <Providers>{children}</Providers>;
};

export default ItemsLayout;
