"use client";

import { usePostsQuery } from "@/features/get-posts";
import { Button } from "@/shared/ui";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Items() {
  const t = useTranslations("ItemsPage");

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const pathname = usePathname();
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const posts = usePostsQuery(page, limit);

  const handlePrevButtonClick = () => {
    replace(createPageURL(page - 1), { scroll: false });
  };

  const handleNextButtonClick = () => {
    replace(createPageURL(page + 1), { scroll: false });
  };

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

      <Button disabled={page <= 1} onClick={handlePrevButtonClick}>
        {t("prevNavButton")}
      </Button>
      <Button onClick={handleNextButtonClick}>{t("nextNavButton")}</Button>
    </div>
  );
}
