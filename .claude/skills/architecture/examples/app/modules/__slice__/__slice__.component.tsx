'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { use<Entity>ListQuery } from '@/app/entities/api/__slice__'

import { ElementComponent } from './elements/__element__'
import { SLICE_CONSTANTS } from './__slice__.constant'
import type { ISliceProps } from './__slice__.interface'
import { sliceService } from './__slice__.service'

// interface
interface IProps extends ISliceProps {}

// component
const SliceComponent: FC<Readonly<IProps>> = (props) => {
  const t = useTranslations('<Slice>')

  const query = use<Entity>ListQuery(SLICE_CONSTANTS.defaultPage)

  const items = sliceService.normalize(query.data)

  // return
  return (
    <section>
      <h1>{t('title')}</h1>
      {items.map((item) => (
        <ElementComponent key={item.id} {...item} />
      ))}
    </section>
  )
}

export default SliceComponent
