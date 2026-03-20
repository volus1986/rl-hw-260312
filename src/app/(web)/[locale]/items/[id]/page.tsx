import { postsApi } from "@/app/entities/api";
import { notFound } from "next/navigation";
import { Item } from "./components/item.component";

import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await postsApi.getPostCached(Number(id));

  return {
    title: item.title,
    description: item.body,
  };
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await postsApi.getPostCached(Number(id));

  if (!item.id) {
    notFound();
  }

  return <Item item={item} />;
}
