import { useTranslations } from "next-intl";

export default function Items() {
  const t = useTranslations("ItemsPage");

  return <main>{t("title")}</main>;
}
