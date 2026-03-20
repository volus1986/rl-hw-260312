"use client";

import { LanguageSwitcher } from "@/app/features/language-switcher";
import { Link } from "@/pkg/locale";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <header className="bg-background sticky top-0 z-50">
      <div
        className="mx-auto flex max-w-7xl items-center justify-between gap-8
          px-4 py-7 sm:px-6">
        <div
          className="text-muted-foreground flex flex-1 items-center gap-8
            font-medium md:justify-center lg:gap-16">
          <Link href="/items" className="hover:text-primary max-md:hidden">
            {t("items")}
          </Link>
          <Link href="/login" className="hover:text-primary max-md:hidden">
            {t("login")}
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
