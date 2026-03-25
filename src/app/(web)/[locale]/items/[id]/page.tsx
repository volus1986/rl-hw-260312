import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { postsApi } from '@/app/entities/api';
import { ItemModule } from '@/app/modules/item';

interface IProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const { id } = await params;
  const item = await postsApi.getPostCached(Number(id));

  return {
    title: item.title,
    description: item.body,
  };
};

const ItemPage = async ({ params }: IProps) => {
  const { id } = await params;
  const item = await postsApi.getPostCached(Number(id));

  if (!item.id) {
    notFound();
  }

  return <ItemModule item={item} />;
};

export default ItemPage;
