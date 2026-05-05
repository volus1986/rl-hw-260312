'use client'

import { type FC } from 'react'

// interface
interface IProps {
  id: number
  title: string
}

// component
const ElementComponent: FC<Readonly<IProps>> = (props) => {
  const { title } = props

  // return
  return <article>{title}</article>
}

export default ElementComponent
