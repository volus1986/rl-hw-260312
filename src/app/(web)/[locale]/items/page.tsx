"use client";

import { usePostsQuery } from "@/features/get-posts";
import { Button } from "@/shared/ui";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Items() {
  const t = useTranslations("ItemsPage");

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const posts = usePostsQuery(page, limit);

  const postsEls = posts.data?.map((post) => {
    return (
      <div key={post.id} className="flex gap-8">
        <div>{post.id}</div>
        <div>{post.userId}</div>
        <div>{post.title}</div>
      </div>
    );
  });

  return (
    <div>
      {postsEls}
    </div>
  );
}
