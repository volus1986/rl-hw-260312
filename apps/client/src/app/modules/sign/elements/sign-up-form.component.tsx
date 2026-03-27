'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Input, Label } from '@/app/shared/ui';

import ErrorMessage from './error-message.component';

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

type Inputs = z.infer<typeof zodSchema>;

const SignUpFormComponent: FC = () => {
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

  const handleSubmitSuccess: SubmitHandler<Inputs> = (data) => {
    console.log(data); // todo: add loading
  };

  const handleSubmitError: SubmitErrorHandler<Inputs> = (data) => {
    console.log(data); // todo: add error handler
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitError)}>
      <div className='space-y-1'>
        <Label htmlFor='userName' className='leading-5'>
          {t('nameLabel')}
        </Label>

        <Input {...register('name')} id='userName' placeholder={t('nameInputPlaceholder')} />
        <ErrorMessage message={formState.errors.name?.message && t(formState.errors.name?.message)} />
      </div>

      <div className='space-y-1'>
        <Label htmlFor='userEmail' className='leading-5'>
          {t('emailLabel')}
        </Label>
        <Input {...register('email')} id='userEmail' placeholder={t('emailInputPlaceholder')} />
        <ErrorMessage message={formState.errors.email?.message && t(formState.errors.email?.message)} />
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
        <ErrorMessage
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
        <ErrorMessage
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
    </form>
  );
};

export default SignUpFormComponent;
