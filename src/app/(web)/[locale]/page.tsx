import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function RootPage() {
  const t = useTranslations("RootPage");

  return (
    <div className="flex flex-col items-center justify-center mt-80">
      <div>
        <Link href={"items"}>{t("items")}</Link>
      </div>
      <div>
        <Link href={"login"}>{t("login")}</Link>
      </div>
    </div>
  );
}
