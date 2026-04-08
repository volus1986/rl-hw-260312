import { NextPage } from 'next';

import { MainComponent } from '@/app/modules/main';

// interface
interface IProps {}

// component
const MainPage: NextPage<Readonly<IProps>> = () => {
  // return
  return <MainComponent />;
};

export default MainPage;
