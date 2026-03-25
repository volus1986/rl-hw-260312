import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { ItemsModule } from '@/app/modules/items';
import { postsApi } from '@/app/entities/api';

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
    queryFn: () => postsApi.getPosts(page, limit),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemsModule />
    </HydrationBoundary>
  );
};

export default ItemsPage;
