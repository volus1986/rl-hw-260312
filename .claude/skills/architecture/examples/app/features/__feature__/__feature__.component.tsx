'use client'

import { type FC } from 'react'

// interface
interface IProps {
  label: string
}

// component
const FeatureComponent: FC<Readonly<IProps>> = (props) => {
  const { label } = props

  // return
  return <button type='button'>{label}</button>
}

export default FeatureComponent
