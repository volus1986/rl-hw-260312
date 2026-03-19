"use client";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/shared/ui";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations("ItemsPage");

  const handleClick = () => {
    router.push("/items");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-80">
      <h2 className="mb-4 text-3xl font-semibold">{t("pageNotFoundTitle")}</h2>
      <p className="mb-6">{t("pageNotFoundDescription")}</p>
      <Button size="lg" className="rounded-lg text-base" onClick={handleClick}>
        {t("pageNotFoundGoToItemsPageButton")}
      </Button>
    </div>
  );
}
