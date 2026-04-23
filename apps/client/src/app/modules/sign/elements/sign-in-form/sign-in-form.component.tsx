'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { userSignIn } from '@/app/entities/api';
import { useUserStore } from '@/app/shared/store';
import { useRouter } from '@/pkg/locale';
import { Button, Input, Label } from '@/pkg/shadcn';
import { Card, CardContent, CardHeader, CardTitle } from '@/pkg/shadcn/ui/components/card';

import { ErrorMessageComponent } from '../error-message';

const zodSchema = z.object({
  email: z.email('incorrectEmailErrorMessage').nonempty('requiredErrorMessage'),
  password: z.string().nonempty('requiredErrorMessage'),
});

type TInputs = z.infer<typeof zodSchema>;

// interface
interface IProps {}

// component
const SignInFormComponent: FC<Readonly<IProps>> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [apiError, setApiError] = useState<{ message: string; seconds?: number } | null>(null);

  const t = useTranslations('SignPage');
  const router = useRouter();
  const userStore = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TInputs>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(zodSchema),
  });

  useEffect(() => {
    if (userStore.user) {
      router.push('/items');
    }
  }, [userStore.user]);

  const handleSubmitSuccess: SubmitHandler<TInputs> = async (data) => {
    try {
      const res = await userSignIn(data.email, data.password);

      if (!res.error) {
        setApiError(null);
      } else {
        setApiError(res.error);
      }
    } catch (err) {
      console.error(err);
      setApiError({ message: 'loginFailedErrorMessage' });
    }
  };

  // return
  return (
    <Card className='w-full border-none shadow-md sm:max-w-lg'>
      <CardHeader className='gap-6'>
        <CardTitle className='mb-1.5 text-2xl'>{t('signInTab')}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <fieldset className='space-y-4' disabled={isSubmitting}>
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

          <ErrorMessageComponent
            message={apiError ? t(apiError.message, { seconds: apiError.seconds ?? 0 }) : undefined}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInFormComponent;
