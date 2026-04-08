import { NextPage } from 'next';

import { ItemsComponent } from '@/app/modules/items';

export const revalidate = 3600;

// interface
interface IProps {}

// component
const ItemsPage: NextPage<Readonly<IProps>> = () => {
  // return
  return <ItemsComponent />;
};

export default ItemsPage;
