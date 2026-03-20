"use client";

import { Post } from "@/app/entities/models";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/app/shared/ui";
import { useTranslations } from "use-intl";

export function Item({ item }: { item: Post }) {
  const router = useRouter();
  const t = useTranslations("ItemPage");

  const handleClick = () => {
    router.back();
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{t("postId")}</td>
            <td>{item.id}</td>
          </tr>
          <tr>
            <td>{t("postUserId")}</td>
            <td>{item.userId}</td>
          </tr>
          <tr>
            <td>{t("postTitle")}</td>
            <td>{item.title}</td>
          </tr>
          <tr>
            <td className="pr-4">{t("postDescription")}</td>
            <td>{item.body}</td>
          </tr>
        </tbody>
      </table>

      <Button onClick={handleClick}>{t("previousPageButton")}</Button>
    </div>
  );
}
