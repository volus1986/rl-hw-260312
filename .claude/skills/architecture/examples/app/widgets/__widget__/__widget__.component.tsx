'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/shadcn'

import { ElementComponent } from './elements/__element__'

// interface
interface IProps {}

// component
const WidgetComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('<Widget>')

  // return
  return (
    <header>
      <ElementComponent />
      <Link href='/'>
        <Button variant='link'>{t('home')}</Button>
      </Link>
    </header>
  )
}

export default WidgetComponent
