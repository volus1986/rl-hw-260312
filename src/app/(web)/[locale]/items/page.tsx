import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/features/language-switcher";

export default function Items() {
  const t = useTranslations("ItemsPage");

  return (
    <main>
      <h1>{t("title")}</h1>
      <LanguageSwitcher />
    </main>
  );
}
