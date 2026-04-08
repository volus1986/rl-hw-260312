import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/shared/ui';

import { SignInFormComponent, SignUpFormComponent } from './elements';

// interface
interface IProps {}

// component
const SignComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('SignPage');

  // return
  return (
    <div className='flex mt-80 justify-center items-center'>
      <Tabs defaultValue='login' className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='login'>{t('signInTab')}</TabsTrigger>
          <TabsTrigger value='register'>{t('signUpTab')}</TabsTrigger>
        </TabsList>

        <TabsContent value='login'>
          <SignInFormComponent />
        </TabsContent>

        <TabsContent value='register'>
          <SignUpFormComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignComponent;
