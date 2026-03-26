import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPostDetails } from '@/app/entities/api';
import { ItemComponent } from '@/app/modules/item';

interface IProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const { id } = await params;
  const item = await getPostDetails(Number(id));

  return {
    title: item.title,
    description: item.body,
  };
};

const ItemPage = async ({ params }: IProps) => {
  const { id } = await params;
  const item = await getPostDetails(Number(id));

  if (!item.id) {
    notFound();
  }

  return <ItemComponent item={item} />;
};

export default ItemPage;
