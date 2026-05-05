import type { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

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

  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!id) {
    return { title: 'Not Found' };
  }

  try {
    const item = await getPhotoDetails({ id });

    // return
    return {
      title: `Photo ${item.id} Details page`,
      description: item.title,
    };
  } catch {
    return { title: 'Not Found' };
  }
};

// component
const Page: NextPage<Readonly<IProps>> = async (props) => {
  const { params } = props;

  const queryClient = getQueryClient();

  const id = Number((await params).id);

  if (!id) {
    notFound();
  }

  try {
    await queryClient.fetchQuery(photoDetailsQueryOptions(id));
  } catch {
    notFound();
  }

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemComponent id={id} />
    </HydrationBoundary>
  );
};

export default Page;
