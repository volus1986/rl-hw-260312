'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { signUp } from '@/app/entities/api/sign';
import { ErrorMessageComponent } from '@/app/shared/components/error-message';
import { useUserStore } from '@/app/shared/store/user.store';
import { useRouter } from '@/pkg/locale';
import { Button, Input, Label } from '@/pkg/shadcn';
import { Card, CardContent, CardHeader, CardTitle } from '@/pkg/shadcn/ui/components/card';

const MIN_PASSWORD_LENGTH = 8;

const zodSchema = z
  .object({
    name: z.string().nonempty('requiredErrorMessage'),
    email: z.email('incorrectEmailErrorMessage').nonempty('requiredErrorMessage'),
    password: z.string().min(MIN_PASSWORD_LENGTH, 'minLengthErrorMessage'),
    confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, 'minLengthErrorMessage'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwordsAreNotMatchErrorMessage',
  });

type TInputs = z.infer<typeof zodSchema>;

// interface
interface IProps {}

// component
const SignUpFormComponent: FC<Readonly<IProps>> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [apiError, setApiError] = useState<{ message: string; seconds?: number } | null>(null);

  const t = useTranslations('SignPage');
  const router = useRouter();
  const userStore = useUserStore();

  useEffect(() => {
    if (userStore.user) {
      router.push('/items');
    }
  }, [userStore.user]);

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(zodSchema),
  });

  const handleSubmitSuccess: SubmitHandler<TInputs> = async (data) => {
    const res = await signUp({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (res.error) {
      setApiError(res.error);
    } else if (res.data) {
      userStore.setUser(res.data);
      setApiError(null);
    } else {
      setApiError(null);
      window.location.reload(); // Handle case when not login after registration.
    }
  };

  // return
  return (
    <Card className='w-full border-none shadow-md sm:max-w-lg'>
      <CardHeader className='gap-6'>
        <CardTitle className='mb-1.5 text-2xl'>{t('signUpTab')}</CardTitle>
      </CardHeader>

      <CardContent>
        <form className='space-y-4' onSubmit={handleSubmit(handleSubmitSuccess)}>
          <fieldset className='space-y-4' disabled={formState.isSubmitting}>
            <div className='space-y-1'>
              <Label htmlFor='userName' className='leading-5'>
                {t('nameLabel')}
              </Label>

              <Input {...register('name')} id='userName' placeholder={t('nameInputPlaceholder')} />
              <ErrorMessageComponent message={formState.errors.name?.message && t(formState.errors.name?.message)} />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='userEmail' className='leading-5'>
                {t('emailLabel')}
              </Label>

              <Input {...register('email')} id='userEmail' placeholder={t('emailInputPlaceholder')} />
              <ErrorMessageComponent message={formState.errors.email?.message && t(formState.errors.email?.message)} />
            </div>

            <div className='w-full space-y-1'>
              <Label htmlFor='password' className='leading-5'>
                {t('passwordLabel')}
              </Label>

              <div className='relative'>
                <Input
                  {...register('password')}
                  id='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder='••••••••••••••••'
                  className='pr-9'
                />

                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                  className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none
                    hover:bg-transparent'>
                  {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                  <span className='sr-only'>{isPasswordVisible ? t('hidePasswordText') : t('showPasswordText')}</span>
                </Button>
              </div>

              <ErrorMessageComponent
                message={
                  formState.errors.password?.message &&
                  t(formState.errors.password?.message, {
                    minLength: MIN_PASSWORD_LENGTH,
                  })
                }
              />
            </div>

            <div className='w-full space-y-1'>
              <Label htmlFor='confirm-password' className='leading-5'>
                {t('confirmPasswordLabel')}
              </Label>

              <div className='relative'>
                <Input
                  id='confirm-password'
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  placeholder='••••••••••••••••'
                  className='pr-9'
                  {...register('confirmPassword')}
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)}
                  className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none
                    hover:bg-transparent'>
                  {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                  <span className='sr-only'>{isPasswordVisible ? t('hidePasswordText') : t('showPasswordText')}</span>
                </Button>
              </div>

              <ErrorMessageComponent
                message={
                  formState.errors.confirmPassword?.message &&
                  t(formState.errors.confirmPassword?.message, {
                    minLength: MIN_PASSWORD_LENGTH,
                  })
                }
              />
            </div>

            <Button className='w-full' type='submit'>
              {t('signUpButton')}
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

export default SignUpFormComponent;
