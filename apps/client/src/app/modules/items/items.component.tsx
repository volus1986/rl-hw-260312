import { type FC, Suspense } from 'react';

import { ItemsListComponent, PaginationControlsComponent } from './elements';

// interface
interface IProps {}

// component
const ItemsComponent: FC<Readonly<IProps>> = async () => {
  // return
  return (
    <div className='grid justify-center py-8'>
      <div className='w-[960]'>
        <h1 className='text-center'></h1>

        <ItemsListComponent />

        <Suspense fallback={<div className='mt-4 h-10'>Loading...</div>}>
          <PaginationControlsComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default ItemsComponent;
