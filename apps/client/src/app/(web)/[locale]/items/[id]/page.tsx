import type { Metadata, NextPage } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getPhotoDetails } from '@/app/entities/api';
import { photoDetailsQueryOptions } from '@/app/entities/api/photo-details';
import { ItemComponent } from '@/app/modules/item';
import { getQueryClient } from '@/pkg/rest-api';

export const revalidate = 3600;

// interface
interface IProps {
  params: Promise<{ id: string }>;
}

// generateMetadata
export const generateMetadata = async (props: Readonly<IProps>): Promise<Metadata> => {
  const { params } = props;

  const { id } = await params;
  const item = await getPhotoDetails({ id: Number(id) });

  // return
  return {
    title: `Photo ${item.id} Details page`,
    description: item.title,
  };
};

// component
const Page: NextPage<Readonly<IProps>> = async (props) => {
  const { params } = props;

  const id = Number((await params).id);
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(photoDetailsQueryOptions(id));

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemComponent id={id} />
    </HydrationBoundary>
  );
};

export default Page;
