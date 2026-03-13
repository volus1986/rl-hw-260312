"use client";

import React from "react";
// import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/shared/ui";

const locales = ["en", "de"] as const;

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  // const currentLocale = useLocale();
  const currentLocale = params.locale ?? "en";

  const handleChangeLocale = (nextLocale: (typeof locales)[number]) => {
    if (nextLocale === currentLocale) return;

    const normalizedPathname =
      pathname.replace(/^\/(en|de)(?=\/|$)/, "") || "/";

    router.replace(
      { pathname: normalizedPathname, params },
      { locale: nextLocale },
    );
  };

  const buttonsRender = locales.map((code) => {
    const isSelected = code === currentLocale;

    return (
      <Button
        key={code}
        type="button"
        onClick={() => handleChangeLocale(code)}
        style={{
          padding: "0.25rem 0.75rem",
          borderRadius: "0.25rem",
          border: "1px solid #ccc",
          backgroundColor: isSelected ? "#111827" : "#ffffff",
          color: isSelected ? "#ffffff" : "#111827",
          cursor: isSelected ? "default" : "pointer",
        }}>
        {code.toUpperCase()}
      </Button>
    );
  });

  return <div style={{ display: "flex", gap: "0.5rem" }}>{buttonsRender}</div>;
};
