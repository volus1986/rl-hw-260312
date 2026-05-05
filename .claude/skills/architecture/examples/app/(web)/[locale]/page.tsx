import { NextPage } from 'next'

import { SliceComponent } from '@/app/modules/__slice__'

// interface
interface IProps {}

// component
const Page: NextPage<Readonly<IProps>> = () => {
  // return
  return <SliceComponent />
}

export default Page
