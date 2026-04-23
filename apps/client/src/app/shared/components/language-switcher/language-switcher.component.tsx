'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

import { usePathname, useRouter } from '@/pkg/locale';
import { Tabs, TabsList, TabsTrigger } from '@/pkg/shadcn';

// constants
const locales = ['en', 'de'] as const;

// interface
interface IProps {}

// component
const LanguageSwitcherComponent: FC<Readonly<IProps>> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const currentLocale = params.locale ?? 'en';

  const handleChangeLocale = (nextLocale: (typeof locales)[number]) => {
    if (nextLocale === currentLocale) {
      // return
      return;
    }

    const normalizedPathname = pathname.replace(/^\/(en|de)(?=\/|$)/, '') || '/';

    router.replace({ pathname: normalizedPathname }, { locale: nextLocale });
  };

  const buttonsRender = locales.map((code) => {
    // return
    return (
      <TabsTrigger key={code} value={code} onClick={() => handleChangeLocale(code)}>
        {code.toUpperCase()}
      </TabsTrigger>
    );
  });

  // return
  return (
    <div className='flex gap-0.5'>
      <Tabs defaultValue={currentLocale.toString()}>
        <TabsList>{buttonsRender}</TabsList>
      </Tabs>
    </div>
  );
};

export default LanguageSwitcherComponent;
