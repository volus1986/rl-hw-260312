import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getPostList } from '@/app/entities/api';
import { ItemsComponent } from '@/app/modules/items';

const ItemsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryClient = new QueryClient();
  const queries = await searchParams;

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
