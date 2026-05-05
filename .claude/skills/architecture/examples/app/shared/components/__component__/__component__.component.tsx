'use client'

import { type FC } from 'react'

// interface
interface IProps {
  title: string
}

// component
const Component: FC<Readonly<IProps>> = (props) => {
  const { title } = props

  // return
  return <div>{title}</div>
}

export default Component
