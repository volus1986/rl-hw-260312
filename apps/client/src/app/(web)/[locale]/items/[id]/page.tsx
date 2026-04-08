import type { Metadata, NextPage } from 'next';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getPostDetails } from '@/app/entities/api';
import { ItemComponent } from '@/app/modules/item';

export const revalidate = 3600;

// interface
interface IProps {
  params: Promise<{ id: string }>;
}

// generateMetadata
export const generateMetadata = async (props: Readonly<IProps>): Promise<Metadata> => {
  const { params } = props;

  const { id } = await params;
  const item = await getPostDetails({ id: Number(id) });

  // return
  return {
    title: item.title,
    description: item.body,
  };
};

// component
const Page: NextPage<Readonly<IProps>> = async (props) => {
  const { params } = props;

  const id = Number((await params).id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['postDetails', id],
    queryFn: ({ signal }) => getPostDetails({ id, signal }),
    staleTime: 60 * 60 * 1000,
  });

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemComponent id={id} />
    </HydrationBoundary>
  );
};

export default Page;
