'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { userSignUp } from '@/app/entities/api/user';
import { Button, Input, Label } from '@/app/shared/ui';
import { useRouter } from '@/pkg/locale';

import { ErrorMessageComponent } from '../error-message';

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

const SignUpFormComponent: FC = () => {
  const router = useRouter();
  const t = useTranslations('SignPage');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

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
    const res = await userSignUp({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (res.error?.message) {
      console.log('error:', res.error.message);
    } else if (res.data?.id) {
      router.push('/items'); // Handle case when login after registration.
    } else {
      window.location.reload(); // Handle case when not login after registration.
    }
  };

  return (
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
    </form>
  );
};

export default SignUpFormComponent;
