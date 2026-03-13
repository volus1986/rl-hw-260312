import { useTranslations } from "next-intl";

export default function Items() {
  const t = useTranslations("ItemsPage");

  return (
    <main>
      <h1>{t("title")}</h1>
    </main>
  );
}
