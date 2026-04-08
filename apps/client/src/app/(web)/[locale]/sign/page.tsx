import { NextPage } from 'next';

import { SignComponent } from '@/app/modules/sign';

// interface
interface IProps {}

// component
const SignPage: NextPage<Readonly<IProps>> = () => {
  // return
  return <SignComponent />;
};

export default SignPage;
