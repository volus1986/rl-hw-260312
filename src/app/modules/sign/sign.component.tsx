import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/shared/ui';
import { useTranslations } from 'next-intl';

import { SignInFormComponent, SignUpFormComponent } from './elements';

const SignComponent = () => {
  const t = useTranslations('SignPage');

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
