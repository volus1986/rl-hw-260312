import type { Metadata, NextPage } from 'next';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getPostDetails } from '@/app/entities/api';
import { ItemComponent } from '@/app/modules/item';

interface IProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async (props: Readonly<IProps>): Promise<Metadata> => {
  const { id } = await props.params;
  const item = await getPostDetails({ id: Number(id) });

  return {
    title: item.title,
    description: item.body,
  };
};

const Page: NextPage<Readonly<IProps>> = async (props) => {
  const id = Number((await props.params).id);
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['postDetails', id],
      queryFn: ({ signal }) => getPostDetails({ id, signal }),
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemComponent id={Number(id)} />
    </HydrationBoundary>
  );
};

export default Page;
