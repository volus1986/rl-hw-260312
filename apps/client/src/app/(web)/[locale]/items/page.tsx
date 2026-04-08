import { NextPage } from 'next';

import { ItemsComponent } from '@/app/modules/items';

// interface
interface IProps {}

// component
const ItemsPage: NextPage<Readonly<IProps>> = () => {
  // return
  return <ItemsComponent />;
};

export default ItemsPage;
