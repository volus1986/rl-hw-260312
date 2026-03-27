'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { userSignIn } from '@/app/entities/api';
import { userTokenStore, useUserStore } from '@/app/shared/store';
import { Button, Input, Label } from '@/app/shared/ui';
import { useRouter } from '@/pkg/locale';

import ErrorMessageComponent from './error-message.component';

const zodSchema = z.object({
  email: z.email('incorrectEmailErrorMessage').nonempty('requiredErrorMessage'),
  password: z.string().nonempty('requiredErrorMessage'),
});

type Inputs = z.infer<typeof zodSchema>;

const SignInFormComponent = () => {
  const router = useRouter();
  const t = useTranslations('SignPage');
  const [isVisible, setIsVisible] = useState(false);
  const userStore = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(zodSchema),
  });

  //  todo: logger, for testing
  if (userTokenStore.getState().token) console.log('the token is already exists');
  else console.log('the token not exists');

  if (userStore.user) console.log(`User: ${JSON.stringify(userStore.user)}`);

  const handleSubmitSuccess: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await userSignIn(data.email, data.password);

      userTokenStore.getState().setToken(res.data.token);

      userStore.setUser({
        id: res.data.id,
        email: res.data.email,
        name: res.data.name,
      });

      router.push('/items');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitError: SubmitErrorHandler<Inputs> = (data) => {
    console.log(data); //  todo: add error handler
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitError)}>
      <fieldset disabled={isSubmitting}>
        <div className='space-y-1'>
          <Label htmlFor='userEmail' className='leading-5'>
            {t('emailLabel')}
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} type='text' id='userEmail' placeholder={t('emailInputPlaceholder')} />
                <ErrorMessageComponent message={fieldState?.error?.message && t(fieldState.error.message)} />
              </>
            )}
          />
        </div>

        <div className='w-full space-y-1'>
          <Label htmlFor='password' className='leading-5'>
            {t('passwordLabel')}
          </Label>
          <div className='relative'>
            <Controller
              name='password'
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id='password'
                    type={isVisible ? 'text' : 'password'}
                    placeholder='••••••••••••••••'
                    className='pr-9'
                  />
                  <ErrorMessageComponent message={fieldState?.error?.message && t(fieldState?.error?.message)} />
                </>
              )}
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => setIsVisible((prevState) => !prevState)}
              className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none
                hover:bg-transparent'>
              {isVisible ? <EyeOffIcon /> : <EyeIcon />}
              <span className='sr-only'>{isVisible ? t('hidePasswordText') : t('showPasswordText')}</span>
            </Button>
          </div>
        </div>

        <Button className='w-full' type='submit'>
          {t('signInTab')}
        </Button>
      </fieldset>
    </form>
  );
};

export default SignInFormComponent;
