"use client";

import React from "react";

import { usePathname, useRouter } from "@/pkg/locale";
import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/app/shared/ui";

const locales = ["en", "de"] as const;

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

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
    return (
      <TabsTrigger
        key={code}
        value={code}
        onClick={() => handleChangeLocale(code)}>
        {code.toUpperCase()}
      </TabsTrigger>
    );
  });

  return (
    <div className="flex gap-0.5">
      <Tabs defaultValue={currentLocale.toString()}>
        <TabsList>{buttonsRender}</TabsList>
      </Tabs>
    </div>
  );

  // Old version style:
  // const buttonsRender = locales.map((code) => {
  //   const isSelected = code === currentLocale;

  //   return (
  //     <Button
  //       key={code}
  //       type="button"
  //       onClick={() => handleChangeLocale(code)}
  //       disabled={isSelected}>
  //       {code.toUpperCase()}
  //     </Button>
  //   );
  // });

  // return <div style={{ display: "flex", gap: "0.5rem" }}>{buttonsRender}</div>;
};
