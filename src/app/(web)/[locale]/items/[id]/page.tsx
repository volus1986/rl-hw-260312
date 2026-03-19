import { postsApi } from "@/entities/posts/api";
import { notFound } from "next/navigation";
import { PreviousPageButton } from "./components/previous-page-button.component";

import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await postsApi.getPost(Number(id));

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
  const item = await postsApi.getPost(Number(id));

  if (!item.id) {
    notFound();
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>id:</td>
            <td>{item.id}</td>
          </tr>
          <tr>
            <td>User id:</td>
            <td>{item.userId}</td>
          </tr>
          <tr>
            <td>Title:</td>
            <td>{item.title}</td>
          </tr>
          <tr>
            <td className="pr-4">Description:</td>
            <td>{item.body}</td>
          </tr>
        </tbody>
      </table>

      <PreviousPageButton />
    </div>
  );
}
