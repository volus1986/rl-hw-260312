'use client';

import { useParams } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/app/shared/ui';
import { usePathname, useRouter } from '@/pkg/locale';

const locales = ['en', 'de'] as const;

const LanguageSwitcherComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const currentLocale = params.locale ?? 'en';

  const handleChangeLocale = (nextLocale: (typeof locales)[number]) => {
    if (nextLocale === currentLocale) return;

    const normalizedPathname = pathname.replace(/^\/(en|de)(?=\/|$)/, '') || '/';

    router.replace({ pathname: normalizedPathname }, { locale: nextLocale });
  };

  const buttonsRender = locales.map((code) => {
    return (
      <TabsTrigger key={code} value={code} onClick={() => handleChangeLocale(code)}>
        {code.toUpperCase()}
      </TabsTrigger>
    );
  });

  return (
    <div className='flex gap-0.5'>
      <Tabs defaultValue={currentLocale.toString()}>
        <TabsList>{buttonsRender}</TabsList>
      </Tabs>
    </div>
  );
};

export default LanguageSwitcherComponent;
