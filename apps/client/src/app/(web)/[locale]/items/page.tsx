import { NextPage } from 'next';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getPostList } from '@/app/entities/api';
import { ItemsComponent } from '@/app/modules/items';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ItemsPage: NextPage<Readonly<IProps>> = async (props) => {
  const queryClient = new QueryClient();
  const queries = await props.searchParams;

  console.log(queries);

  const page = Number(queries.page) || 1;
  const limit = 20;

  await queryClient.prefetchQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => getPostList(page, limit),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemsComponent />
    </HydrationBoundary>
  );
};

export default ItemsPage;
